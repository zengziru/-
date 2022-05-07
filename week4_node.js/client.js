   
const net=require('net');
require('./server');
const protocol=require('./protocol');

const socket=net.connect({port:8080});

var buffer=Buffer.alloc(0);

socket.on('connect',()=>{
    console.log('Client Connected successfully!');
    for(let i=0;i<10;i++)   
        socket.write(protocol.pack(i.toString()));
    socket.write(protocol.pack('Start!'));
    socket.end(protocol.pack('Client closed!'));
});

socket.on('data',function(data){
    var obj=protocol.unpack(buffer,data);
    while(obj.package.length) {
        console.log('Client receive:',obj.package);
        buffer=obj.buffer;
        obj=protocol.unpack(buffer,Buffer.alloc(0));
    }
});