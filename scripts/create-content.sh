#!/usr/bin/env bash

# Obtiene la raíz del proyecto.
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Número inicial.
start=3

# Nombres de las secciones.
names=(
    analisis-de-error
    datos-calculados
    resultados
    interpretacion-resultados
    conclusiones
)

# Crea el directorio si no existe.
mkdir -p "$PROJECT_ROOT/content"

# Recorre los nombres.
for ((i=0; i<${#names[@]}; i++)); do

    # Genera la numeración.
    if (( start == 0 )); then
        # Con 0, comienza desde 01.
        number=$(printf "%02d" $((i + 1)))
    else
        # Con otro valor, comienza desde start + 1. Ej: start=3 → "04-archivo".tex.
        number=$(printf "%02d" $((start + $((i + 1)))))
    fi

    # Crea el archivo.
    touch "$PROJECT_ROOT/content/${number}-${names[$i]}.tex"
done