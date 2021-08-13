#!/bin/bash
pin=`echo "$QUERY_STRING" | grep -oE "(^|[?&])pin=[0-9]+" | cut -f 2 -d "=" | head -n1`
state=`echo "$QUERY_STRING" | grep -oE "(^|[?&])state=[0-9]+" | cut -f 2 -d "=" | head -n1`
#sshpass -p 1048576 ssh -t pi@192.168.1.12 ./relay.sh $pin $state &

python /home/pi/relay.py $1 $2 &

echo "cgi-bin call" > /tmp/relay.log
#python /home/pi/r.py &
echo "Conten-Type: text/html\n\n hw"

