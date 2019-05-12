
from socket import *   

#address = ("198.199.121.184",4446)
address = ("127.0.0.1",4446)

listenSocket=socket(AF_INET, SOCK_STREAM)
listenSocket.bind(address)                 
listenSocket.listen(9)               
        
print("Listening for connections.. ")
insocket, addr = listenSocket.accept()
           
my_str_as_bytes = str.encode("foo ~!# bar")
data=my_str_as_bytes

insocket.send(data)
listenSocket.close()
