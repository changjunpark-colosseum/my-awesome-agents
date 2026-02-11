#!/bin/bash

# analyze-project.sh
# Usage: ./analyze-project.sh [src_directory]

DIR=${1:-.}

echo "=== JavaScript to TypeScript Migration Status ==="
echo "Target Directory: $DIR"

JS_COUNT=$(find "$DIR" -name "*.js" -not -path "*/node_modules/*" | wc -l)
JSX_COUNT=$(find "$DIR" -name "*.jsx" -not -path "*/node_modules/*" | wc -l)
TS_COUNT=$(find "$DIR" -name "*.ts" -not -path "*/node_modules/*" | wc -l)
TSX_COUNT=$(find "$DIR" -name "*.tsx" -not -path "*/node_modules/*" | wc -l)
TOTAL=$((JS_COUNT + JSX_COUNT + TS_COUNT + TSX_COUNT))

if [ $TOTAL -eq 0 ]; then
  echo "No source files found."
  exit 0
fi

echo ""
echo "Files Statistics:"
echo "-----------------"
echo "JS  Files (*.js):  $JS_COUNT"
echo "JSX Files (*.jsx): $JSX_COUNT"
echo "TS  Files (*.ts):  $TS_COUNT"
echo "TSX Files (*.tsx): $TSX_COUNT"
echo "-----------------"
echo "Total Files:       $TOTAL"

TS_TOTAL=$((TS_COUNT + TSX_COUNT))
PERCENT=$(( 100 * TS_TOTAL / TOTAL ))

echo ""
echo "Migration Progress: $PERCENT%"
echo "================================================="
