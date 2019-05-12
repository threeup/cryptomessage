
import socket
import sys
import threading
import random

address = ("198.199.121.184",4446)
#address = ("127.0.0.1",4446)

listenSocket=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listenSocket.bind(address)                 
listenSocket.listen(9)               
        

class clientThread(threading.Thread):
    def __init__(self, conn, address):
        threading.Thread.__init__(self)
        self.conn = conn
        self.addr = address
        self.id = random.randint(100,109)
        print("thread")
        self.daemon = True
        self.start()

    def run(self):
        msg = 'Welcome to xtMessage id:'+str(self.id)+' \n'
        self.conn.send(msg.encode())
        ctime = 0
        while ctime < 999:
            print("working")
            ctime+=1
            try:
                data = self.conn.recv(1024)
                if not data: 
                    break
                msg = data.decode('ascii')
                reply = str(self.id)+':'+ msg
                replydata = reply.encode()
                self.conn.sendall(replydata)
            except:
                break
        
        print("Terminate connection ")
        self.conn.close()

print("Host Start")
time = 0
while time < 999:
    time+=1
    print("Listening for connections")
    inConnection, addr = listenSocket.accept()
    print("Added connection",str(addr[1]))
    c = clientThread(inConnection, addr)
    
