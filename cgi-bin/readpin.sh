#!/bin/bash
relay=`echo "$QUERY_STRING" | grep -oE "(^|[?&])relay=[0-9]+" | cut -f 2 -d "=" | head -n1`

pins=(8 10 16 18 29 31 33 35)
pinId=`echo "$(($relay-1))"`
pin=${pins[$pinId]}
value=`gpio -1 read $pin`
[ "$value" -eq 1 ] && state="off" || state="on"
json="{\"state\": \"${state}\"}"
echo Content-type: text/plain
echo
echo $json
