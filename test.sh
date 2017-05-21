#!/usr/bin/env bash
DIR="$(pwd)"

for file in ./revisions/*.json
do
    mongoimport --jsonArray --db test --collection revisions --file "${DIR}${file:1}"
done
