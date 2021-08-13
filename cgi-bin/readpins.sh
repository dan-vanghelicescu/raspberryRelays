#!/bin/bash
declare -a states
pins=(8 10 16 18 29 31 33 35)
for pin in "${pins[@]}"
do
    value=`gpio -1 read $pin`
    [ "$value" -eq 1 ] && state="off" || state="on"
    states+=($state)
done
json="{\"states\": \"${states[@]}\"}"
echo Content-type: text/plain
echo
echo $json
