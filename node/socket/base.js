var userCount = 0;
module.exports = (io)=>{
    io.on('connect', (socket)=>{
        userCount++;
        
        console.log(userCount + ' Connected');
        socket.on('disconnect',()=>{
            userCount--;
            // console.log('user disconnected');
            io.emit('on-user',userCount);
        });

        socket.on('new-message',(msg)=>{
            // console.log(msg);
            io.emit('new-message',msg);
        });

        io.emit('on-user',userCount);
    });
}