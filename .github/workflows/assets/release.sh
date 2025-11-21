#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

VERSION="$1"

## Increment the version numbers in all yaml files, that contain the version number.
## The version inside the yaml files is expected to be in the format: `version: 0.1.0`.
##
## @arg $1 string The version that should be written to the files.
function incrementVersionsInYaml() {
  yaml_files=(
    "radar/radar.yml"
  )

  for file in "${yaml_files[@]}"; do
    sed -i "s/version: .*/version: $VERSION/" "$file"
  done
}

## Increment the version numbers in all json files, that contain the version number.
## The version inside the json files is expected to be in the format: `"version": "0.1.0"`.
##
## @arg $1 string The version that should be written to the files.
function incrementVersionsInJson() {
  json_files=(
    "radar/public/radar-data.json"
  )

  for file in "${json_files[@]}"; do
    sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" "$file"
  done
}

incrementVersionsInYaml
incrementVersionsInJson
