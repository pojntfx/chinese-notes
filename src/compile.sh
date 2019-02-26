#!/bin/bash

# Compile all Markdown files in directory to PDFs with hot-reloading

## Splash Screen

echo "Felicitas Pojtinger <felicitas@pojtinger.com> @pojntfx's Hot-Reloading Multi File Markdown Compilation Script"
echo "Version 0.0.1-0"
echo "SPDX-License-Idenitifier: AGPL-3.0"

## Check for dependencies

echo "[INFO] Checking if dependencies are installed ..."

# if [ -z "$(command -v pandoc)" ]; then
#     echo "[ERROR] \`pandoc\` package is not in \$PATH" && exit 1
# fi

if [ -z "$(command -v npx)" ]; then
    echo "[ERROR] \`npx\` command of the \`nodejs\` package is not in \$PATH" && exit 1
fi

echo "[SUCCESS] Binary dependencies are installed"

## Install Python dependencies

echo "[INFO] Installing Python dependencies ..."

pip3 install flask bs4 --user

echo "[SUCCESS] Python dependencies have been installed"

## For each file, watch for changes and recompile if necessary

echo "[INFO] Compiling Markdown to PDF ..."

find "$PWD" -iname "*.md" -type f -exec sh -c 'npx nodemon -w "${0%}" -x "npx md-to-pdf \"${0}\" \"${0%.md}.pdf\" & python3 bin/mdtable2csv \"${0}\" -o \"${0%.md}.csv\"" &' {} \;

echo "[INFO] Nodemon is now watching for changes and recompiling the PDFs if necessary ..."
