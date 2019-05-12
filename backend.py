import zerorpc
from socket import *             # Imports socket module


class netClient():
    def connect(self):
        #address = ("198.199.121.184",4446)   
        address = ("127.0.0.1",4446)   
       
        netsocket = socket(AF_INET, SOCK_STREAM)  
        netsocket.connect(address)       
        msg=netsocket.recv(1024)  
        
        print ("Message from server : " + msg.strip().decode('ascii'))
        
        netsocket.close()                            

class rpcServer():
    def hello(self, name):
        return f'Hello, {name}'


    def get_object(self):
        dummyData = {
            'a_key': True,
            'an_array': [1, 2, 3],
            'something_witty': False,
            'string': 'Lorem Ipsum',
            'float': 3.14,
            'int': 9
        }
        return dummyData

print("starting..")
rpcserver = zerorpc.Server(rpcServer())
rpcserver.bind('tcp://0.0.0.0:4242')
print("rpc created",rpcserver)
rpcserver.run()
print("rpc running",rpcserver)


client = netClient()
print("net client created",client)
client.connect()
print("net client running",client)