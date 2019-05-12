import sys
import socket
import time

def response(netsocket):
    msg = netsocket.recv(1024)  
    asciimsg = msg.strip().decode('ascii')
    print (">> ", asciimsg)

serverAddress = ("198.199.121.184",4446) 
#serverAddress = ("127.0.0.1",4446)  


netsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
netsocket.connect(serverAddress)  

response(netsocket)
r='syn'
netsocket.send(r.encode())
response(netsocket)

time.sleep(2)

r='ack'
netsocket.send(r.encode())
response(netsocket)
time.sleep(2)

r='synack'
netsocket.send(r.encode())
response(netsocket)
time.sleep(11)