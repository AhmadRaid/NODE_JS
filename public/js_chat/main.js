var socket = io();
const chat_form = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// get name and room from url 

 const {username , room} = Qs.parse(location.search , {
//Qs is library iam use for get data from url
    ignoreQueryPrefix : true

 });


 socket.emit('joinRoom', {username , room});


socket.on('message', message => {

    output_in_form_message(message);

     //scroll down
     chatMessages.scrollTop = chatMessages.scrollHeight;
})


chat_form.addEventListener('submit', e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage' , msg);

   //clear input 

   e.target.elements.msg.value = '';
   e.target.elements.msg.focus();
})

function output_in_form_message(message) {
   
const div = document.createElement('div');
div.classList.add('message');
div.innerHTML = `<p class="meta">${message.userName}<span>${message.time}</span></p>
<p class="text"> ${message.text} </p>`;

document.querySelector('.chat-messages').appendChild(div)

}

//get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

//Add room name to DOM
function outputRoomName(room){
    roomName.innerHTML = room;
}


//Add users to DOM
function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user => `<li> ${user.username} </li>`).join('')}
    `;
}