#!/usr/bin/env python
import os
from os import path
from time import sleep
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')
sensor_file = '/sys/bus/w1/devices/28-0213924558cf/w1_slave'

def read_temp_raw():
    if (not path.exists(sensor_file)):
	return False
    f = open(sensor_file, 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp():
    lines = read_temp_raw()
    if not lines:
	return "ERR"
    if lines[0].strip()[-3:] != 'YES':
	return "N/A"
    temp_pos = lines[1].find('t=')
    if temp_pos == -1:
	return "N\A"
    temp_string = lines[1][temp_pos + 2:]
    temp = float(temp_string) / 1000.0
    return '{:05.2f}'.format(temp)

json = '{"temp": "' + read_temp() + '"}'

print("Content-type: text/html\n")
print(json)


