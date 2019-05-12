import zerorpc
import sys
import socket

serverAddress = ("198.199.121.184",4446) 
#serverAddress = ("127.0.0.1",4446)  
rpcAddress = 'tcp://0.0.0.0:4242'

class messageCore():
    netsocket = None
    address = ()
    def __init__(self, address):
        self.address = address

    def get_connect(self):
        print("connecting...")
        sys.stdout.flush()
        self.netsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
        self.netsocket.connect(self.address)  
        return 'connected'

    def get_disconnect(self):
        print ("Disconnected")
        sys.stdout.flush()
        self.netsocket.close()

    def get_read(self):     
        asciimsg = "--"
        if self.netsocket is not None:
            msg = self.netsocket.recv(1024)  
            asciimsg = msg.strip().decode('ascii')
            print (">> " + asciimsg)
            sys.stdout.flush()
        return asciimsg
        
    def get_send(self, name):
        print("get_send...",name)
        sys.stdout.flush()
        return f'send, {name}'


    def get_test(self):
        print("get_test...")
        sys.stdout.flush()
        dummyData = {
            'a_key': True,
            'an_array': [1, 2, 3],
            'something_witty': False,
            'string': 'Lorem Ipsum',
            'float': 3.14,
            'int': 9
        }
        return dummyData
  
rpcserver = zerorpc.Server(messageCore(serverAddress))
rpcserver.bind(rpcAddress)
print("Launch RPC")
sys.stdout.flush()
rpcserver.run()


