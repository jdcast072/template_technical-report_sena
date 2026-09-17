# Plantilla LaTeX para informes técnicos

Plantilla reutilizable para elaborar informes técnicos y documentos académicos con LaTeX. El proyecto utiliza la clase estándar `report`. La configuración, el contenido, la portada, los recursos y la bibliografía se mantienen separados para facilitar su mantenimiento.

## Características

- Documento `report` en tamaño carta, 12 puntos y una sola cara.
- Idioma español y codificación UTF-8.
- Márgenes configurados con `geometry`.
- Índice general generado automáticamente.
- Citas parentéticas con `\parencite{clave}`.
- Bibliografía procesada con `biblatex` y `biber`.
- Portada personalizable con TikZ.
- Tablas con `booktabs` y títulos configurables con `caption`.

## Estructura del proyecto

```text
.
├── README.md
├── assets/
│   ├── images/
│   └── tables/
│       ├── table-01.tex
│       └── table-02.tex
├── bibliography/
│   └── references.bib
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

`build/`, `main.pdf` y los archivos auxiliares son resultados de compilación. No deben editarse manualmente.

## Archivo principal

### `main.tex`

Es el punto de entrada del informe. Carga los paquetes, metadatos y ajustes, incorpora la portada y el contenido, genera el índice y muestra las referencias.

```latex
\documentclass[12pt,letterpaper,oneside]{report}

\input{config/packages.tex}
\input{config/metadata.tex}
\input{config/settings.tex}

\begin{document}
\input{frontmatter/cover.tex}
\tableofcontents

\input{content/01-introduccion.tex}
\input{content/02-marco-teorico.tex}
\input{content/03-desarrollo.tex}
\input{content/04-hoja-datos.tex}
\input{content/05-conclusiones.tex}

\printbibliography[heading=bibnumbered,title={Referencias}]
\end{document}
```

### `\documentclass`

Comando fundamental en LaTeX que define la clase o tipo de documento global a utilizar, por ejemplo `report` o `memoir`, estableciendo las reglas de diseño predeterminadas. Esta plantilla utiliza `report`, que permite organizar el informe mediante capítulos y secciones.

## Directorios y archivos

### `config/`

Contiene la configuración global del informe.

- `metadata.tex`: datos variables como título, autor, institución, asignatura, docente y fecha.
- `packages.tex`: paquetes, márgenes y configuración de citas y bibliografía.
- `settings.tex`: colores, ajustes de TikZ, profundidad de secciones y formato del índice.

### `frontmatter/`

Contiene las partes preliminares del informe:

- `cover.tex`: portada, logotipos, título, autor, institución y fecha.
- `abstract.tex`: resumen, si el informe lo requiere.
- `acknowledgments.tex`: agradecimientos, si el informe los requiere.

### `content/`

Contiene el cuerpo del informe. Cada archivo se incorpora desde `main.tex` mediante `\input`. En la clase `report`, los capítulos se crean con `\chapter{Título}` y las divisiones internas con `\section{Título}`.

### `assets/`

- `assets/images/`: logotipos, diagramas y otras imágenes.
- `assets/tables/`: archivos `.tex` con tablas reutilizables.

### `bibliography/`

Contiene `references.bib`, el archivo BibTeX que almacena las fuentes del informe.

### `build/`

Puede contener archivos `.aux`, `.bbl`, `.bcf`, `.blg`, `.log`, `.run.xml`, `.toc` y el PDF generado. Se recomienda excluir este directorio del control de versiones si se utiliza Git.

### `scripts/`

- `create-content.ps1`: crea archivos numerados desde PowerShell en Windows.
- `create-content.sh`: crea archivos numerados desde Bash, Linux o WSL.

## Configuración de página e índice

- **`geometry`**: Paquete de LaTeX utilizado para controlar y personalizar con precisión milimétrica los márgenes del documento: superior, inferior, izquierda y derecha.

  ```latex
  \usepackage[top=3cm,bottom=3cm,left=4cm,right=2cm]{geometry}
  ```

- **`showframe`**: Paquete de diagnóstico que dibuja líneas y rectángulos delimitadores en el PDF para visualizar los bordes exactos del área de texto y los márgenes. Está comentado en la plantilla y puede activarse temporalmente:

  ```latex
  \usepackage{showframe}
  ```

- **`\tableofcontents`**: Comando encargado de generar automáticamente la tabla de contenido o índice general a partir de las secciones y capítulos del documento.

- **`tocloft`**: Paquete avanzado para personalizar la apariencia, los espaciados y el diseño del índice general, de tablas o de figuras.

## Bibliografía y citas

- **`\printbibliography`**: Comando del paquete `biblatex` que imprime la lista consolidada de referencias bibliográficas al final del documento.

- **`biblatex` / `biber`**: Sistema moderno de gestión de bibliografía en LaTeX, altamente compatible con la estructuración de citas bajo normas formales. `biblatex` configura las citas y `biber` procesa el archivo `.bib`.

La plantilla configura el sistema en `config/packages.tex`:

```latex
\usepackage[
    backend=biber,
    style=authoryear,
    language=spanish,
    sorting=nyt,
    maxcitenames=2
]{biblatex}

\addbibresource{bibliography/references.bib}
```

Agrega una fuente en `bibliography/references.bib`:

```bibtex
@book{ejemplo2026,
    author    = {Apellido, Nombre},
    title     = {Título del libro},
    year      = {2026},
    publisher = {Editorial}
}
```

Después utiliza la clave en el contenido:

```latex
La documentación técnica debe identificar sus fuentes \parencite{ejemplo2026}.
```

También puedes usar una cita narrativa:

```latex
\textcite{ejemplo2026} explica el principio utilizado.
```

La clave utilizada en la cita debe coincidir exactamente con la clave del archivo `.bib`.

## Entornos y estructura de tablas

- **`\begin{table}` / `\end{table}`**: Entorno flotante que contiene la estructura de una tabla y permite que LaTeX la posicione de forma óptima en la página. `[htbp]` prioriza la ubicación aquí, arriba, abajo o en una página separada.
- **`\centering`**: Comando de alineación que centra horizontalmente el elemento dentro de los márgenes de la página.
- **`\caption`**: Comando oficial de LaTeX para titular y numerar automáticamente tablas y figuras, permitiendo su inclusión en los índices correspondientes.
- **`\label`**: Etiqueta interna invisible que permite referencias cruzadas mediante `\ref{}`. Debe colocarse inmediatamente después de `\caption`.
- **`\begin{tabular}` / `\end{tabular}`**: Entorno que define la cuadrícula interna de celdas. `{lccc}` crea cuatro columnas: izquierda, centrada, centrada y centrada.
- **`\toprule`, `\midrule`, `\bottomrule`**: Líneas horizontales profesionales proporcionadas por `booktabs`, diseñadas para estructurar una tabla sin líneas verticales.
- **`\cmidrule`**: Línea horizontal parcial que abarca un rango específico de columnas, por ejemplo `\cmidrule(lr){2-3}`.
- **`\multicolumn`**: Comando que fusiona horizontalmente varias celdas contiguas en una sola.
- **`&`**: Separador de celdas y columnas en las filas de la tabla.
- **`\\`**: Comando que indica el fin de una fila y el salto a la siguiente.

### Anatomía de una tabla

En `\begin{tabular}{lccc}`, las cuatro letras definen cuatro columnas y su alineación. En `\cmidrule(lr){2-3}`, `(lr)` recorta los bordes izquierdo y derecho y `{2-3}` indica el rango de columnas. En `\multicolumn{2}{c}{Género}`, el primer argumento fusiona dos columnas, el segundo centra el texto y el tercero define el título.

```latex
\begin{table}[htbp]
    \centering
    \caption{Ejemplo de tabla}
    \label{tab:ejemplo}
    \begin{tabular}{lccc}
        \toprule
        Categoría & A & B & Total \\
        \midrule
        Registro & 10 & 12 & 22 \\
        \bottomrule
    \end{tabular}
\end{table}
```

La tabla se referencia así:

```latex
Como se observa en la tabla \ref{tab:ejemplo}, los valores están organizados.
```

## Ajuste de ancho y desbordamientos

- **`p{ancho}`**: Parámetro de columna que fija un ancho específico, por ejemplo `p{4cm}`, y permite saltos de línea automáticos.
- **`\resizebox{\textwidth}{!}{...}`**: Comando de `graphicx` que escala proporcionalmente una tabla para ocupar el ancho disponible.
- **`\parbox`**: Caja de texto con ancho definido que permite agrupar párrafos largos dentro de una celda.

Siempre que sea posible, ajusta las columnas con `p{}` antes de escalar una tabla completa para conservar la legibilidad.

## Código e imágenes

- **`\includegraphics`**: Comando estándar para insertar recursos gráficos y controlar sus dimensiones.

  ```latex
  \includegraphics[width=0.5\textwidth]{assets/images/nombre-imagen}
  ```

- **`\texttt{}`**: Texto en fuente monoespaciada, ideal para nombres de tablas, campos, rutas y comandos cortos.
- **`\begin{verbatim}` / `\end{verbatim}`**: Entorno para bloques que respeta espacios y tabulaciones y no interpreta los caracteres especiales de LaTeX.

Ejemplo de imagen con título y referencia:

```latex
\begin{figure}[htbp]
    \centering
    \includegraphics[width=0.7\textwidth]{assets/images/diagrama.png}
    \caption{Diagrama del sistema}
    \label{fig:diagrama-sistema}
\end{figure}
```

## Flujo de trabajo

1. Crea una copia de la plantilla.
2. Actualiza `config/metadata.tex` y `frontmatter/cover.tex`.
3. Modifica o agrega archivos dentro de `content/`.
4. Actualiza los `\input{...}` de `main.tex` si cambia la estructura.
5. Guarda imágenes en `assets/images/` y tablas reutilizables en `assets/tables/`.
6. Agrega las fuentes a `bibliography/references.bib` y cítalas desde el contenido.
7. Compila con LaTeX y Biber.

## Compilación

La secuencia manual para `biblatex` con Biber es:

```bash
pdflatex main.tex
biber main
pdflatex main.tex
pdflatex main.tex
```

La primera ejecución crea los archivos auxiliares, `biber` procesa las fuentes y las dos ejecuciones siguientes actualizan citas, índice y referencias cruzadas.

Si el proyecto utiliza `build/` como directorio de salida:

```bash
pdflatex -interaction=nonstopmode -output-directory=build main.tex
biber build/main
pdflatex -interaction=nonstopmode -output-directory=build main.tex
pdflatex -interaction=nonstopmode -output-directory=build main.tex
```

Con `latexmk`, utiliza Biber y no BibTeX:

```bash
latexmk -pdf -use-biber main.tex
```

### Visual Studio Code

En Windows se recomienda instalar MiKTeX o TeX Live, Biber y la extensión LaTeX Workshop. Si `latexmk` lo requiere, también debe estar disponible Perl.

En LaTeX Workshop selecciona una receta que utilice `latexmk` con Biber. Una receta propia debe incluir `-use-biber` o una herramienta `biber` entre la primera y las últimas ejecuciones de LaTeX.

## Scripts de contenido

En PowerShell:

```powershell
.\scripts\create-content.ps1
```

En Bash o WSL:

```bash
chmod +x scripts/create-content.sh
./scripts/create-content.sh
```

Antes de ejecutar un script, revisa la variable `names` y el número inicial para evitar crear archivos con nombres no deseados.

## Recomendaciones

- Mantén la configuración en `config/` y evita concentrarla en `main.tex`.
- Usa nombres numerados de dos dígitos para conservar el orden de los archivos.
- Mantén una clave bibliográfica única y descriptiva para cada fuente.
- Coloca `\label` inmediatamente después de `\caption`.
- Ejecuta Biber cada vez que agregues o modifiques referencias.
- No edites manualmente los archivos auxiliares de `build/`.
- Activa `showframe` solo durante la revisión de márgenes y desactívalo antes de entregar el informe.
- Revisa el PDF final para comprobar saltos de página, tablas, imágenes, citas y referencias.

## Lista de personalización

| Elemento | Ubicación |
|---|---|
| Clase y flujo del documento | `main.tex` |
| Paquetes y bibliografía | `config/packages.tex` |
| Ajustes visuales | `config/settings.tex` |
| Metadatos | `config/metadata.tex` |
| Portada | `frontmatter/cover.tex` |
| Resumen y agradecimientos | `frontmatter/` |
| Contenido | `content/` |
| Imágenes | `assets/images/` |
| Tablas | `assets/tables/` |
| Referencias | `bibliography/references.bib` |
| Automatización | `scripts/` |

Esta organización proporciona una base clara para desarrollar informes técnicos en LaTeX sin mezclar el contenido con la configuración del documento.
