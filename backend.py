import zerorpc

class mainServer():
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


print("server running")
server = zerorpc.Server(mainServer())
server.bind('tcp://0.0.0.0:4242')
server.run()