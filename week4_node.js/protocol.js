const startSign=0xf;
const lenLimit=4;
const headLen=1+lenLimit;
var currentSeq=0;
//打包函数,封装data
function pack(data) {
    let head=Buffer.alloc(headLen),body=Buffer.from(data);
    head[0]=startSign;
    head.writeUIntBE(body.length,1,lenLimit);
    return Buffer.concat([head,body]);
}

//解包函数，buffer和data链接后再解包
//3种情况，开头违规，数据包不完整，成功完整解包
function unpack(buffer,data) {
    let newBuf=Buffer.concat([buffer,data]),stpos=newBuf.indexOf(startSign);
    if(stpos<0) 
        return {
            package:Buffer(0),
            buffer:newBuf
        };
    else if(stpos>0) 
        newBuf=newBuf.slice(stpos);

    if(newBuf.length<=headLen) 
        return {
            package:Buffer(0),
            buffer:newBuf
        };
    
    let packLen=newBuf.readInt32BE(1);
    if(headLen+packLen>newBuf.length)
        return {
            package:Buffer(0),
            buffer:newBuf
        }
    return {
        package:newBuf.slice(headLen,headLen+packLen),
        buffer:newBuf.slice(headLen+packLen)
    }
}


module.exports={pack,unpack};