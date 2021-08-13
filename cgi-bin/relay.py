#!/usr/bin/python

import sys
import RPi.GPIO as GPIO
import cgi

print 'Content-type: text/html\n\n.'

fs = cgi.FieldStorage()

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

pins = [8,10,16,18,29,31,33,35]

pin = pins[int(fs["relay"].value) - 1]
cmd = int(fs["state"].value)
cmd = 0 if cmd else 1

GPIO.setup(pin, GPIO.OUT)
GPIO.setup(pin, cmd)