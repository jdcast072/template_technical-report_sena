# Plantilla LaTeX para informes técnicos

Plantilla reutilizable para elaborar informes técnicos con LaTeX. El proyecto utiliza la clase estándar `report` y separa la configuración, los elementos preliminares, el contenido, los recursos y la bibliografía para facilitar su mantenimiento.

La plantilla se ajustó desde una organización orientada a trabajos en formato APA hacia un informe técnico: la portada, la hoja de datos, la jerarquía de capítulos, los colores institucionales y el formato de tablas responden ahora a la estructura del informe, no a una norma APA.

## Estructura del proyecto

```text
.
├── README.md
├── assets/
│   ├── images/
│   └── tables/
│       ├── table-01.tex
│       └── table-02.tex
├── bibliography/references.bib
├── build/
├── config/
│   ├── metadata.tex
│   ├── packages.tex
│   └── settings.tex
├── content/
│   ├── 01-introduccion.tex
│   ├── 02-marco-teorico.tex
│   ├── 03-desarrollo.tex
│   ├── 04-hoja-datos.tex
│   └── 05-conclusiones.tex
├── frontmatter/
│   ├── abstract.tex
│   ├── acknowledgments.tex
│   └── cover.tex
├── main.tex
└── scripts/
  ├── create-content.ps1
  └── create-content.sh
```

`build/`, el PDF y los archivos auxiliares son resultados de compilación. No deben editarse manualmente.

## Flujo de `main.tex`

`main.tex` es el punto de entrada. Carga los paquetes, metadatos y ajustes; incorpora la portada, el índice, los capítulos del informe y la bibliografía.

```latex
\documentclass[12pt,letterpaper,oneside]{report}

\input{config/packages.tex}
\input{config/metadata.tex}
\input{config/settings.tex}

\begin{document}
\input{frontmatter/cover.tex}
	ableofcontents

\input{content/01-introduccion.tex}
\input{content/02-marco-teorico.tex}
\input{content/03-desarrollo.tex}
\input{content/04-hoja-datos.tex}
\input{content/05-conclusiones.tex}

\printbibliography[heading=bibnumbered,title={Referencias}]
\end{document}
```

La clase `report` permite organizar el documento mediante `\chapter`, `\section` y niveles inferiores. El orden de los archivos se controla desde los `\input` de `main.tex`.

## Configuración del informe

### `config/packages.tex`

Centraliza los paquetes usados por el documento:

- `babel`, `inputenc` y `fontenc` configuran el idioma español y la codificación.
- `geometry` establece tamaño carta y márgenes de 3 cm arriba y abajo, 4 cm a la izquierda y 2 cm a la derecha.
- `graphicx` permite insertar imágenes.
- `booktabs` proporciona líneas profesionales para tablas.
- `caption` controla títulos de tablas y figuras.
- `titlesec` y `tocloft` personalizan capítulos e índice.
- `xcolor` y `tikz` construyen los elementos visuales de la portada.
- `hyperref` y `bookmark` generan enlaces y marcadores del PDF sin recuadros visibles.
- `biblatex` con `biber` administra las referencias almacenadas en `bibliography/references.bib`.

La configuración de bibliografía es autor-año, útil para documentar las fuentes del informe técnico, pero el proyecto no se presenta como una plantilla APA. El estilo final debe seguir las instrucciones del curso o de la institución.

### `config/settings.tex`

Define el aspecto general del informe:

- Ajusta la numeración de capítulos y la profundidad mostrada en el índice.
- Centra y cambia el tamaño del título del índice.
- Declara los colores institucionales `greenPrimary` y `greenLight` usados por la portada.
- Configura el formato de las tablas mediante `\captionsetup[table]`.

El formato actual de los títulos de tabla coloca `Tabla X` en negrita, separa la etiqueta del título con un salto de línea, centra el bloque y muestra el texto del título en cursiva.

### `config/metadata.tex`

Contiene los metadatos digitales del PDF: título, autor, asunto, palabras clave y creador. Debe actualizarse cuando el informe cambie de tema o autoría.

## Elementos preliminares

### `frontmatter/cover.tex`

Construye la portada del informe técnico con TikZ. Incluye el logotipo SENA, las franjas verdes, el título de la evidencia, autor, programa, asignatura, docente y fecha. Los datos visibles de la portada se editan en este archivo.

### `content/04-hoja-datos.tex`

Agrega el capítulo `Hoja de datos del documento` al índice y presenta la información técnica del informe en una tabla de dos columnas: título, autoría, fecha, palabras clave, resumen bibliográfico y lista de distribución.

Los archivos `frontmatter/abstract.tex` y `frontmatter/acknowledgments.tex` están disponibles para informes que requieran resumen o agradecimientos. Si se incorporan al PDF, deben añadirse mediante `\input` en `main.tex`.

## Contenido del informe

Los archivos de `content/` contienen los capítulos que se cargan desde `main.tex`:

- `01-introduccion.tex`: contexto, problema, objetivos y alcance.
- `02-marco-teorico.tex`: conceptos y fundamentos del tema.
- `03-desarrollo.tex`: procedimiento, análisis o solución técnica.
- `04-hoja-datos.tex`: ficha técnica del documento.
- `05-conclusiones.tex`: resultados, conclusiones y trabajo futuro.

Se pueden agregar capítulos con nombres numerados de dos dígitos y registrar el nuevo `\input` en `main.tex`.

## Tablas con `caption`

Las tablas se guardan como archivos `.tex` reutilizables en `assets/tables/`. La numeración ya no se escribe manualmente: `\caption` genera automáticamente la etiqueta `Tabla X` y el título, mientras que `\label` permite referenciar la tabla desde el texto.

La secuencia correcta es:

```tex
\begin{table}[htbp]
  \centering
  \caption{Título breve y descriptivo de la tabla}
  \label{tab:identificador}
  \begin{tabular}{lcc}
    	\toprule
    & Elemento & Valor 1 & Valor 2 \\
    \midrule
    Registro & 10 & 12 \\
    \bottomrule
  \end{tabular}
\end{table}
```

`\label` debe ir inmediatamente después de `\caption`. Luego, la tabla se cita en el contenido con:

```latex
Como se observa en la tabla \ref{tab:identificador}, los valores están organizados.
```

### Recursos utilizados en las tablas

- `table` es el contenedor flotante y `[htbp]` permite a LaTeX elegir una ubicación adecuada.
- `tabular` define las columnas; por ejemplo, `{lccc}` crea una columna alineada a la izquierda y tres centradas.
- `booktabs` aporta `\toprule`, `\midrule`, `\bottomrule` y `\cmidrule`.
- `\multicolumn` combina celdas para encabezados agrupados.
- `p{4.5cm}` permite columnas con ancho fijo y salto de línea automático.
- `\renewcommand{\arraystretch}{1.5}` aumenta el espacio vertical cuando una tabla contiene texto.

`assets/tables/table-01.tex` muestra una tabla con encabezado agrupado, nota y fuente. `assets/tables/table-02.tex` sirve como estructura base para una tabla de dos columnas con nota. Para incluir una tabla guardada en uno de esos archivos, usa `\input{assets/tables/table-01.tex}` desde el capítulo correspondiente.

## Imágenes y otros recursos

Guarda logotipos, diagramas y figuras en `assets/images/`. Se insertan con `graphicx`:

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.7\textwidth]{assets/images/diagrama.png}
  \caption{Diagrama del sistema}
  \label{fig:diagrama-sistema}
\end{figure}
```

Usa `p{ancho}` para resolver primero los desbordamientos de texto en tablas. Reserva `\resizebox{\textwidth}{!}{...}` para los casos en que la tabla completa necesite ajustarse al ancho disponible.

## Bibliografía

Agrega las fuentes a `bibliography/references.bib` con una clave única:

```bibtex
@book{ejemplo2026,
  author    = {Apellido, Nombre},
  title     = {Título del libro},
  year      = {2026},
  publisher = {Editorial}
}
```

En el contenido, usa la clave con `\parencite{ejemplo2026}` o `\textcite{ejemplo2026}`. La bibliografía se imprime al final de `main.tex` mediante `\printbibliography` y se procesa con Biber.

## Compilación

La secuencia manual es:

```bash
pdflatex main.tex
biber main
pdflatex main.tex
pdflatex main.tex
```

También se puede usar `latexmk`:

```bash
latexmk -pdf -use-biber main.tex
```

En Visual Studio Code se necesita una distribución LaTeX como MiKTeX o TeX Live, Biber y LaTeX Workshop. La receta debe usar `biber` o `-use-biber`.

## Scripts y flujo de trabajo

Para crear archivos de contenido numerados:

```powershell
.\scripts\create-content.ps1
```

En Bash o WSL:

```bash
chmod +x scripts/create-content.sh
./scripts/create-content.sh
```

Flujo recomendado:

1. Actualiza `config/metadata.tex` y los datos visibles en `frontmatter/cover.tex`.
2. Ajusta la estructura y el orden de los capítulos en `main.tex`.
3. Escribe el informe en `content/`.
4. Guarda imágenes en `assets/images/` y tablas reutilizables en `assets/tables/`.
5. Usa `\caption` seguido inmediatamente por `\label` en cada tabla o figura.
6. Agrega y cita las fuentes de `bibliography/references.bib`.
7. Compila, revisa el PDF y verifica márgenes, índice, tablas, imágenes y referencias.

No edites manualmente los archivos generados en `build/`. El paquete `showframe`, actualmente comentado en `config/packages.tex`, puede activarse solo para revisar los márgenes y debe desactivarse antes de entregar el informe.
