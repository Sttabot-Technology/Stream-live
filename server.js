const express=require('express')
const path=require('path')
const app=express()
const http=require('http')
const socketio=require('socket.io')
const formateMessage=require('./utils/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./utils/users')


const server=http.createServer(app)

const io=socketio(server)

const PORT=process.env.PORT || 4000



//set static folder
app.use(express.static(path.join(__dirname,'public')))

const botname="statbot"

//Run when a client coonects
io.on('connection',socket=>{
    
    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room)

        socket.join(user.room)
        // socket.broadcast.to(user.room).emit('message',formateMessage(botname,`${user.username} has joined`))

        //Send users information
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        })

    //     socket.on('disconnect',()=>{
    //     io.emit('message',formateMessage(botname,`${user.username} has left`))
    // })
    })

    
  
    

    //Listen for chat message
    socket.on('chatMessage',msg=>{
        const user=getCurrentUser(socket.id)
        // console.log(msg);
        io.to(user.room).emit('message',formateMessage(user.username,msg))
    })

     socket.on('disconnect',()=>{
         const user=userLeave(socket.id)
         if(user){{
             io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        })
         }}
    })
})

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})