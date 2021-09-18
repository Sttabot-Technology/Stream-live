const chatForm=document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')
const usereList=document.getElementById('users')

//Get username from URL

// const {username,email}=Qs.parse(location.search,{ignoreQeryPrefix:true})

// console.log(username,email)

const queryString = window.location.search;
console.log(queryString);
// ?fname=johnny&lname=depp

const urlParams = new URLSearchParams(queryString);

const username = urlParams.get('username');
console.log(username);
// johnny

const email  = urlParams.get('email');
console.log(email);
const room="room";

const socket=io()
//join room
socket.emit('joinRoom',{username,room})

//Get users
socket.on('roomUsers',({room,users})=>{
    //outputRoomName(room,users)
    outputUsersName(users)
})




//Message from server
socket.on('message',message=>{
    outputMessage(message)
    //scrool down 
    chatMessages.scroolTop = chatMessages.scrollHeight
})

//Message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const msg=e.target.elements.msg.value
    //console.log(msg)
    //emiting message to serever
    socket.emit('chatMessage',msg)

    //clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

//OUtput message to dom
function outputMessage(message){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=` <p class="meta">${message.username} <span>${message.time}</span></p>
                    <p class="text">
                        ${message.text}
                    </p>`
    document.querySelector('.chat-messages').appendChild(div)                
}


//Add users to dom
function outputUsersName(users){
    usereList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join('')}
    `
}