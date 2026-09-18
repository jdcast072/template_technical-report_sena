# Plantilla LaTeX para informes técnicos

Plantilla reutilizable para elaborar informes técnicos con LaTeX. El proyecto utiliza la clase estándar `report` y separa la configuración, la portada, el contenido, los recursos y la bibliografía para facilitar el mantenimiento del informe.

La estructura está orientada a un informe técnico y puede adaptarse a las indicaciones de la institución. La configuración actual usa capítulos numerados, citas numéricas compatibles con ISO 690, formato institucional verde, tablas con `caption` y un índice con puntos guía.

## Estructura del proyecto

```text
.
├── README.md
├── assets/
│   ├── images/
│   │   ├── SENA.png
│   │   └── SENA-wh-bg.png
│   └── tables/
│       ├── table-01.tex
│       ├── table-02.tex
│       ├── table-03.tex
│       └── table-04.tex
├── bibliography/
│   └── references.bib
├── build/
├── config/
│   ├── metadata.tex
│   ├── packages.tex
│   └── settings.tex
├── content/
│   ├── 01-resumen.tex
│   ├── 02-metodología-experimental.tex
│   ├── 03-procedimiento.tex
│   ├── 04-analisis-de-error.tex
│   ├── 05-datos-calculados.tex
│   ├── 06-resultados.tex
│   ├── 07-interpretacion-resultados.tex
│   └── 08-conclusiones.tex
├── frontmatter/
│   ├── abstract.tex
│   ├── acknowledgments.tex
│   └── cover.tex
├── main.tex
└── scripts/
    ├── create-content.ps1
    └── create-content.sh
```

`build/` contiene archivos auxiliares de compilación. El PDF y los archivos generados no deben editarse manualmente.

## Flujo de `main.tex`

`main.tex` es el punto de entrada. Carga paquetes, metadatos y ajustes; incorpora la portada, el índice, los ocho capítulos y la bibliografía.

```latex
\documentclass[12pt,letterpaper,oneside,hidelinks]{report}

\input{config/packages.tex}
\input{config/metadata.tex}
\input{config/settings.tex}

\begin{document}
\input{frontmatter/cover.tex}
\tableofcontents

\input{content/01-resumen.tex}
\input{content/02-metodología-experimental.tex}
\input{content/03-procedimiento.tex}
\input{content/04-analisis-de-error.tex}
\input{content/05-datos-calculados.tex}
\input{content/06-resultados.tex}
\input{content/07-interpretacion-resultados.tex}
\input{content/08-conclusiones.tex}

\printbibliography[heading=bibnumbered, title={Bibliografía}]
\end{document}
```

La clase `report` organiza el documento con `\chapter`, `\section`, `\subsection` y niveles inferiores. Cada archivo de `content/` representa un capítulo principal independiente; las divisiones menores deben permanecer dentro del archivo del capítulo correspondiente. El orden final se controla mediante los comandos `\input` de `main.tex`.

## Organización del contenido

Los archivos actuales cumplen estas funciones:

- `01-resumen.tex`: resumen general, contexto y estructura inicial del informe.
- `02-metodología-experimental.tex`: método de trabajo, recolección de datos y tabla inicial.
- `03-procedimiento.tex`: pasos de la práctica o muestra de cálculo y tabla de apoyo.
- `04-analisis-de-error.tex`: cálculo y análisis numérico o estadístico de los errores.
- `05-datos-calculados.tex`: datos finales y tablas calculadas.
- `06-resultados.tex`: resultados finales sustentados en los objetivos.
- `07-interpretacion-resultados.tex`: discusión, relaciones entre datos y comparación con la teoría.
- `08-conclusiones.tex`: juicios lógicos extraídos de la interpretación y relacionados con los objetivos.

Los títulos principales deben escribirse con ortografía completa, incluidas las tildes en mayúsculas, por ejemplo `INTERPRETACIÓN`. La configuración de `titlesec` centra, resalta y transforma los títulos de capítulo a mayúsculas en el PDF. Las secciones internas se escriben normalmente con `\section` y `\subsection`.

El paquete `tocloft` y la configuración `\cftchapdotsep` agregan puntos guía entre los títulos de los capítulos y sus números de página en la tabla de contenido.

## Migración de la plantilla

La estructura actual reemplaza la organización inicial de cinco archivos (`01-introduccion.tex`, `02-marco-teorico.tex`, `03-desarrollo.tex`, `04-hoja-datos.tex` y `05-conclusiones.tex`) por ocho capítulos especializados. Al reorganizar el proyecto, los `\input` de `main.tex` y las referencias a los archivos antiguos deben actualizarse al mismo tiempo; no se deben conservar inclusiones de ambos esquemas porque producirían capítulos repetidos o referencias inconsistentes.

Los cambios principales de la migración son:

- El contenido se separó en resumen, metodología experimental, procedimiento, análisis de error, datos calculados, resultados, interpretación y conclusiones.
- La hoja de datos pasó a `assets/tables/table-03.tex` y se añadió `table-04.tex` para el esquema relacional con imagen.
- Las tablas 01 y 02 se adaptaron a la configuración común de `tabularx`, `array`, `float` y el comando `\rb` definido en `config/settings.tex`.
- La portada incorporó la identificación institucional del SENA, el programa de Bases de Datos y el título separado con `\textendash{}`.
- La bibliografía dejó el estilo autor-año y pasó a citas numéricas mediante `biblatex` con `style=numeric`.

Después de cambiar nombres o mover archivos, busca sus rutas en todo el proyecto y recompila desde cero si quedan advertencias relacionadas con auxiliares antiguos.

## Configuración

### `config/packages.tex`

Centraliza los paquetes usados por el documento:

- `babel`, `inputenc` y `fontenc` configuran el idioma español y la codificación.
- `geometry` establece papel carta y márgenes de 3 cm arriba y abajo, 4 cm a la izquierda y 2 cm a la derecha.
- `graphicx` permite insertar imágenes.
- `tabularx`, `array` y `booktabs` proporcionan tablas flexibles y líneas profesionales.
- `float` habilita el especificador `[H]` para fijar la posición de tablas o imágenes.
- `caption` controla el formato de títulos de tablas y figuras.
- `titlesec` y `tocloft` personalizan capítulos e índice.
- `xcolor` y `tikz` construyen los elementos visuales de la portada.
- `hyperref` y `bookmark` crean enlaces y marcadores del PDF.
- `biblatex` con `biber` administra las referencias de `bibliography/references.bib`.

La bibliografía está configurada con estilo `numeric` y orden `nty`, por lo que las citas aparecen numeradas y las referencias se ordenan por nombre, título y año. El proyecto solicita como mínimo tres fuentes válidas.

La opción `hidelinks` aparece en la clase de `main.tex` y en los metadatos para evitar recuadros predeterminados. Posteriormente, `config/settings.tex` aplica `colorlinks=true` y define los colores finales de citas, enlaces internos y URL. Por eso, cualquier cambio visual de los enlaces debe hacerse en `\hypersetup` y no editando cada cita manualmente.

### `config/settings.tex`

Define el aspecto general del informe:

- Centra los capítulos, los muestra en negrita y los transforma a mayúsculas.
- Ajusta la separación vertical de los capítulos.
- Muestra los capítulos y las secciones hasta la profundidad configurada en el índice.
- Declara los colores institucionales `greenPrimary` y `greenLight`.
- Configura los títulos de tabla para mostrar `Tabla X` en negrita, el título en una línea independiente y el texto del título en cursiva.
- Activa enlaces coloreados: citas en `greenPrimary`, enlaces internos en negro y URL en negro.
- Define las columnas reutilizables `L`, `C` y `R` para `tabularx`.
- Define `\rb` como atajo para salto de fila con línea horizontal.
- Convierte los apellidos de las referencias a mayúsculas mediante `\mkbibnamefamily`.

Las columnas personalizadas se declaran así:

```latex
\newcolumntype{L}{>{\raggedright\arraybackslash}X}
\newcolumntype{C}{>{\centering\arraybackslash}X}
\newcolumntype{R}{>{\raggedleft\arraybackslash}X}
\newcommand{\rb}{\\ \hline}
```

Estas definiciones requieren que `tabularx` y `array` estén cargados en `config/packages.tex`. No vuelvas a declararlas en cada tabla.

### `config/metadata.tex`

Es el punto central para la información variable del proyecto. Contiene los metadatos digitales del PDF (`pdftitle`, `pdfauthor`, `pdfsubject`, `pdfkeywords` y `pdfcreator`), además de los metadatos estándar de LaTeX y los comandos personalizados que pueden reutilizarse en la portada y en la hoja de datos.

Actualmente define:

```latex
	itle{Diseño e Implementación de Base de Datos Relacional para Importech S.A.}
\author{Juan Diego Castañeda González}
\date{\today}

\newcommand{\institucion}{Servicio Nacional de Aprendizaje (SENA)}
\newcommand{\facultad}{Área de Diseño de Software}
\newcommand{\docente}{Nombre del Instructor}
\newcommand{\palabrasclave}{Sistema de información, Base de datos relacional, SQL, Importech.}
\newcommand{\resumendoc}{Informe técnico sobre el modelado DDL y DML para el control de ventas.}
```

El título debe ser conciso, explicativo e incluir palabras clave que faciliten la localización del informe en sistemas bibliográficos. Registra los nombres completos de los autores y ordénalos alfabéticamente cuando no exista una prioridad definida de participación. La fecha debe presentarse completa; si se usa una fecha numérica, se recomienda el formato año-mes-día.

Si el formato institucional lo exige, pueden añadirse variables como `\shorttitle{}` para un título corto y `\authorsaffiliations{}` para las afiliaciones. Esas variables no forman parte todavía de la configuración activa, por lo que deben definirse antes de invocarlas.

`main.tex` incorpora estos datos mediante `\input{config/metadata.tex}` antes de cargar la portada. Mantener esta separación evita repetir títulos, autores, institución y fecha en varios archivos y permite actualizar el informe desde un único lugar.

Los metadatos personalizados también están pensados para la hoja de datos del documento. Esa tabla debe reutilizar, cuando se implemente de forma completa, `\title`, `\resumendoc`, `\palabrasclave` y la lista de distribución para facilitar la identificación y recuperación del documento en sistemas de información. La tabla actual de `assets/tables/table-03.tex` conserva algunos valores escritos directamente como ejemplo; al personalizar el informe conviene sustituirlos por las variables centralizadas.

## Portada

`frontmatter/cover.tex` construye la portada con TikZ. Su orden recomendado es:

1. Identificación institucional.
2. Título descriptivo del informe.
3. Autor o autores en orden alfabético.
4. Programa o asignatura.
5. Docente o instructor.
6. Fecha completa de entrega.

La portada usa los logotipos de `assets/images/`, franjas verdes y los datos visibles del informe. Debe reflejar como mínimo la entidad u organismo destinatario, el título, los autores y la fecha; también puede incluir facultad, programa y docente.

La portada activa en `main.tex` es `frontmatter/cover.tex` y actualmente contiene algunos datos escritos directamente. `frontmatter/cover-metadata.tex` es una prueba independiente para insertar la información desde los comandos definidos en `config/metadata.tex`, usando `\@title`, `\@author`, `\@date`, `\institucion`, `\facultad` y `\docente`. No se carga automáticamente en `main.tex`; sirve como referencia experimental para migrar la portada a un flujo totalmente centralizado sin modificar todavía la portada visual vigente.

Los archivos `frontmatter/abstract.tex` y `frontmatter/acknowledgments.tex` están disponibles para informes que requieran resumen o agradecimientos; si se usan, deben incorporarse mediante `\input` en `main.tex`.

## Tablas

Las tablas se guardan como archivos `.tex` reutilizables en `assets/tables/`. La numeración no debe escribirse manualmente: `\caption` genera la etiqueta `Tabla X` y `\label` permite referenciarla.

```latex
\begin{table}[htbp]
  \centering
  \caption{Título breve y descriptivo de la tabla}
  \label{tab:identificador-unico}
  \begin{tabular}{lcc}
    \toprule
    Elemento & Valor 1 & Valor 2 \\
    \midrule
    Registro & 10 & 12 \\
    \bottomrule
  \end{tabular}
\end{table}
```

`\label` debe estar inmediatamente después de `\caption`. Para citar la tabla desde el texto:

```latex
Como se observa en la tabla \ref{tab:identificador-unico}, los valores están organizados.
```

### Reglas de formato

- Usa `\renewcommand{\arraystretch}{1.5}` o un valor similar para aumentar el espacio interno de las celdas y evitar que el texto quede pegado a los bordes.
- Usa `[H]` cuando una tabla deba permanecer exactamente en el punto de inserción y se quiera evitar un salto de página inoportuno. Requiere el paquete `float`.
- Usa `[htbp]` cuando LaTeX pueda elegir una ubicación adecuada para una tabla flotante.
- Para tablas con imágenes, usa celdas de ancho fijo, por ejemplo `p{6cm}`, y una imagen ligeramente menor, por ejemplo `width=4.0cm`.
- Centra la imagen dentro de la celda con `center` y deja pequeños espacios verticales con `\vspace` cuando sea necesario.
- Usa `p{ancho}` para resolver desbordamientos de texto antes de recurrir a `\resizebox{\textwidth}{!}{...}`.

### Archivos actuales

- `table-01.tex`: datos con unidades y encabezado agrupado usando `tabularx` y las columnas `L`, `C` y `R`.
- `table-02.tex`: estructura base de una tabla de dos columnas con nota.
- `table-03.tex`: hoja de datos del documento.
- `table-04.tex`: esquema relacional con una imagen dentro de una celda de ancho fijo.

En `table-04.tex` la tabla usa `[H]`, una celda de ancho fijo de `8cm`, una imagen de `4.0cm` y espacios verticales internos. Este patrón es útil cuando una ilustración debe conservarse dentro de una celda sin desbordar el ancho de la página. Las tablas 01, 02 y 03 usan `[htbp]`, por lo que LaTeX puede moverlas a una posición adecuada.

Cada tabla debe tener un label globalmente único. Un archivo de tabla solo debe incluirse una vez en el flujo del documento. Por ejemplo, `table-01.tex` se carga desde metodología y `table-02.tex` desde procedimiento; no deben volver a incluirse en otro capítulo. Si una tabla se inserta dos veces, LaTeX produce el aviso `Label ... multiply defined` aunque el label solo aparezca una vez dentro del archivo.

## Imágenes

Guarda logotipos, diagramas y demás recursos en `assets/images/` e insértalos con `graphicx`:

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.7\textwidth]{assets/images/diagrama.png}
  \caption{Diagrama del sistema}
  \label{fig:diagrama-sistema}
\end{figure}
```

Los labels de figuras también deben ser únicos y seguir un prefijo como `fig:`. Después de agregar o cambiar imágenes, revisa que la ruta, el tamaño y la posición no produzcan desbordamientos.

## Código fuente con `listings`

El paquete `listings`, cargado en `config/packages.tex`, permite insertar código fuente directamente en el documento y conservar una presentación legible en el PDF. La configuración visual se centraliza en `config/settings.tex` mediante `\lstset`, por lo que los bloques de código mantienen el mismo formato en todos los capítulos.

El estilo actual usa:

- Fondo oscuro `notiondark` y texto claro `notiontext`.
- Fuente monoespaciada pequeña mediante `\ttfamily\small`.
- Palabras reservadas en azul mediante `notionkeyword`.
- Números de línea en el margen izquierdo con `numbers=left`.
- Sin marco exterior (`frame=none`) y con márgenes horizontales internos.
- Salto automático de líneas largas con `breaklines=true`.
- Detección de palabras clave sin distinguir mayúsculas y minúsculas mediante `sensitive=false`.

Para insertar una sentencia SQL, usa el entorno `lstlisting` e indica el lenguaje:

```latex
\begin{lstlisting}[language=SQL, caption={Consulta de productos}, label={lst:consulta-productos}]
SELECT nombre, precio
FROM productos
WHERE precio > 100000
ORDER BY precio DESC;
\end{lstlisting}
```

El bloque puede referenciarse desde el texto con `\ref{lst:consulta-productos}`. Usa labels únicos con el prefijo `lst:` para evitar advertencias de referencias duplicadas. También pueden insertarse otros lenguajes compatibles con `listings`, por ejemplo `Python`, `Java`, `C` o `JavaScript`.

Los parámetros visuales activos se encuentran en `config/settings.tex`. Allí también se conservan, comentadas, algunas opciones alternativas como colores para cadenas y comentarios, marcos y ocultamiento de números de línea. Esas opciones no tienen efecto hasta que se descomenten o se incorporen explícitamente a `\lstset`.

## Citación y bibliografía

Las citas del texto usan superíndices numéricos sin corchetes mediante `\supercite`:

```latex
La aplicación de las normas de citación documenta las fuentes consultadas\supercite{normaAPA7}.
```

La bibliografía final debe titularse **BIBLIOGRAFÍA**, aparecer centrada y en negrita según los lineamientos de entrega. En `main.tex` se genera con:

```latex
\printbibliography[heading=bibnumbered, title={Bibliografía}]
```

Incluye al menos tres fuentes válidas y conserva claves únicas en `references.bib`. Para autores corporativos o institucionales, encierra el nombre completo entre llaves dobles para evitar que `biblatex` lo interprete como nombre y apellido:

```bibtex
author = {{UNIVERSIDAD NACIONAL ABIERTA Y A DISTANCIA}},
```

El comando siguiente, incluido en `config/settings.tex`, presenta los apellidos en mayúsculas sin modificar manualmente cada entrada `.bib`:

```latex
\renewcommand{\mkbibnamefamily}[1]{\MakeUppercase{#1}}
```

Las URL deben conservarse en los campos correspondientes y sus enlaces aparecen con el color definido en `\hypersetup`. Verifica que las claves usadas en `\supercite{...}` existan en `bibliography/references.bib`.

## Compilación

Ejecuta los comandos desde la raíz del proyecto. La secuencia manual es:

```bash
pdflatex -interaction=nonstopmode main.tex
biber main
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
```

También puedes usar `latexmk`:

```bash
latexmk -pdf -use-biber main.tex
```

En Visual Studio Code se necesita una distribución LaTeX como MiKTeX o TeX Live, además de Biber y LaTeX Workshop. Si la receta usa la carpeta `build/` como salida, utiliza el directorio configurado por la receta para ejecutar o limpiar los archivos auxiliares.

Si aparece un warning de labels duplicados, busca el label en todo el proyecto y revisa también las inclusiones `\input`. Después de corregir la causa, recompila dos veces para actualizar referencias, índice y marcadores. No edites manualmente `build/main.aux`.

## Scripts y flujo de trabajo

Para crear los archivos de contenido restantes con numeración de dos dígitos:

```powershell
.\scripts\create-content.ps1
```

En Bash o WSL:

```bash
chmod +x scripts/create-content.sh
./scripts/create-content.sh
```

El script Bash crea el directorio `content/` si no existe y genera los archivos desde la numeración definida en `start`. Antes de ejecutarlo, comprueba que los nombres y números no sobrescriban archivos existentes.

En la versión actual, `start=3` y la lista de nombres genera `04-analisis-de-error.tex`, `05-datos-calculados.tex`, `06-resultados.tex`, `07-interpretacion-resultados.tex` y `08-conclusiones.tex`. Los capítulos 01–03 deben existir previamente porque corresponden al contenido base de resumen, metodología y procedimiento.

Flujo recomendado:

1. Actualiza `config/metadata.tex` y los datos visibles en `frontmatter/cover.tex`.
2. Revisa el título de cada capítulo, su ortografía y sus tildes.
3. Ajusta el orden de los capítulos en `main.tex`.
4. Escribe el contenido y las secciones internas en `content/`.
5. Guarda imágenes en `assets/images/` y tablas reutilizables en `assets/tables/`.
6. Usa `\caption` seguido inmediatamente por un `\label` único en cada tabla o figura.
7. Incluye cada archivo de tabla una sola vez.
8. Agrega al menos tres fuentes y cítalas con `\supercite`.
9. Compila, revisa el PDF y verifica portada, índice, márgenes, tablas, imágenes, citas y bibliografía.

No edites manualmente los archivos generados en `build/`. El paquete `showframe`, actualmente comentado en `config/packages.tex`, puede activarse temporalmente para revisar márgenes y debe desactivarse antes de entregar el informe.
