#!/bin/bash

man="Usage: $0 {BODY} {ENDPOINT}

Example:

$ $0 '{\"image_url\": \"http://image.jpg\", \"category\": \"Rivers\"}' http://localhost:9000/api/photographs"

arg=$1
data=$2
endpoint=$3

function sendPost {
    object=$1
    echo $object
    curl -H 'Content-Type: application/json' -d "$object" $endpoint
}

case $arg in 
    '-u')
        sendPost "$data"
        ;;
    '-f')
        cat $data | jq -c '.[]' | while read object; do
            sendPost "$object"; 
        done
        ;;
    *)
        echo "$man"
esac
