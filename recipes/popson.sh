#!/bin/bash

# ls -1 *.cook | sed 's/\.cook$//' | jq -R '{filenumber:input_line_number, name:.}' | jq -s . > recipes.json
ls *.cook | jq -R '{filenumber:input_line_number, name:.}' | jq -s . > recipes.json
