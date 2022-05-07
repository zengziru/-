
const net=require('net');
const protocol=require('./protocol');

const server=net.createServer((socket)=>{
    var buffer=Buffer.alloc(0);
    console.log('Server Connected successfully!');
    socket.on('data',function(data){
        var obj=protocol.unpack(buffer,data);
        while(obj.package.length) {
            console.log('Server receive:',obj.package);
            buffer=obj.buffer;
            obj=protocol.unpack(buffer,Buffer.alloc(0));
        }
    });
    socket.on('end',function(data){
        console.log(data);
        socket.end(protocol.pack('Server closed.'));
    });
});
server.listen(8080);