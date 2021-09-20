// const myPeer=new Peer(undefined,{
//     host:'/',
//     port:3001,
//     path:'/myapp'
// })


//socket connecting to our root
const socket=io('/')

socket.emit('join-room',ROOM_ID,10)


socket.on('user-connected',(userId)=>{
    console.log('user-connected:'+userId);
})