#!/bin/bash
S0="${BASH_SOURCE[0]}"
DIRNAME="$( dirname "$S0")"
DIR="$( cd "$DIRNAME" && pwd)"


for file in ./revisions/*.json
do
    mongoimport --jsonArray --db wikiAnalysis --collection revisions --file "${DIR}${file:1}"
done
