
// ?node server which will handle socket io connections

const io = require('socket.io')(8000,{cors: {origin: '*',}});//initialize io on 8000
const users = {};//running io server

//ye event mile toh callback call kro
io.on('connection', socket => {//listen incoming events jo connect krega listen krega
    socket.on('new-user-joined', name => {
        // console.log(name);//jab bi particular connection ho toh kya ho user join hogye toh kya kro
        users[socket.id] = name;//name ko append krdo user
        socket.broadcast.emit('user-joined', name)//jisne join kia uski info baki sbko dega ki is user ne join kia hai
    });
    socket.on('send', message => {//kisi ne mes bhja toh kya kre
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })//toh recieve krwa do message
    });
    socket.on('disconnect',message => {//kisi ne mes bhja toh kya kre
        socket.broadcast.emit('leave',users[socket.id]);//toh recieve krwa do message
        delete users[socket.id];
    });
})//jaise hi connection aye socket mai func ko run krdo
