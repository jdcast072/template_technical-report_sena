
// Importa el módulo de nodeJS para trabajor con las rutas de archivos
const path = require("node:path");

// Importa el módulo de nodeJS para en control de salida de los DNS y evitar bloqueos por proveedores
const dns = require('node:dns');
// Aplicar los servidores DNS públicos para resolver el dominio de MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1']);
// Módulo para insertar datos sensibles como variables de entorno con .env
require("dotenv").config({
    path: path.resolve(__dirname, ".env") //__dirname localiza el archivo .env desde el mismo directorio
});

// Módulo para leer archivos Excel.
const xlsx = require('xlsx');
// Importa el cliente de MongoDB y la versión de API de Atlas.
const { MongoClient, ServerApiVersion } = require('mongodb');

// 1. Obtener credenciales desde el .env y codificarlas
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// 2. Construir la URI inyectando las credenciales (asegurando el +srv)
const uri = `mongodb+srv://${user}:${password}@cluster0.exouyu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// 3. Variables de del proyecto
const dbName = 'j-mundial'; // Nombre de base de datos objetivo
const excelFilePath = path.join(__dirname, 'Datafile.xlsx'); //__dirname localiza el archivo .env desde el mismo directorio

// 4. Crear el MongoClient con las opciones de ServerApi (Boilerplate de MongoDB Atlas)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Convierte un valor serial de Excel a YYYY-MM-DD.
function excelDateToString(value) {
    const date = xlsx.SSF.parse_date_code(value);

    return `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`;
}

// Convierte un valor decimal de Excel a HH:mm:ss.
function excelTimeToString(value) {
    const totalSeconds = Math.round(value * 86400);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Función principal para conectar, leer el Excel e importar los datos.
async function run() {
  try {
    // Conectar el cliente al servidor
    await client.connect();
    
    // Enviar un ping para confirmar la conexión inicial
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping exitoso. ¡Te has conectado a MongoDB Atlas correctamente!");

    /* ==========================================
       LÓGICA DE IMPORTACIÓN DE EXCEL
       ==========================================*/
    const db = client.db(dbName); // Selecciona la base de datos.
    const workbook = xlsx.readFile(excelFilePath);

    // Recorre todas las hojas existentes en el archivo Excel.
    for (const sheetName of workbook.SheetNames) {
      console.log(`Procesando hoja: "${sheetName}"...`);

      const sheet = workbook.Sheets[sheetName]; // Obtiene la hoja actual.
      const data = xlsx.utils.sheet_to_json(sheet); //Convierte las filas de Excel en objetos JavaScript (JSON)
      const formattedData = data.map(row => {
        const formattedRow = { ...row };
        // Solo convierte Date si el campo existe.
        if (row.Date !== undefined && row.Date !== null) {
          formattedRow.Date = excelDateToString(row.Date);
        }

        // Solo convierte Time si el campo existe.
        if (row.Time !== undefined && row.Time !== null) {
          formattedRow.Time = excelTimeToString(row.Time);
        }
        return formattedRow;
      });
      // Comprueba si la hoja contiene información.
      if (data.length > 0) {
        // Crea/selecciona una colección con el nombre de la hoja.
        const collection = db.collection(sheetName.trim());
        // Inserta todos los documentos de la hoja en MongoDB.
        const result = await collection.insertMany(formattedData);
        console.log(`✅ Colección "${sheetName}": ${result.insertedCount} documentos insertados.`);
      } else {
        // Informa si la hoja está vacía.
        console.log(`⚠️ La hoja "${sheetName}" está vacía. Se omitió.`);
      }
    }
    console.log('🎉 Todo el proceso ha finalizado con éxito.');

  } catch (error) {
    // Genera el error y la razón del error
    console.error('❌ Error durante la ejecución:', error);
  } finally {
    // Asegura que la conexión se cierre correctamente al finalizar o fallar
    await client.close();
  }
}

// Ejecuta la función principal y muestra cualquier error no controlado.
run().catch(console.dir);