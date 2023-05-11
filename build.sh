#!/bin/sh

mkdir output

pandoc -s main.md -o output/index.html
pandoc -s main.md -o output/javaCode.js
pandoc -s main.md -o output/style.css
