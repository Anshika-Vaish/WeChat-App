const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageinp')
const messagecontainer = document.querySelector(".container")//jo message aye unko container mai daal do
var audio = new Audio('ping.mp3');

const append = (mes, pos) => {
    const meselement = document.createElement('div');
    meselement.innerText = mes;
    meselement.classList.add('message');
    meselement.classList.add(pos);
    messagecontainer.append(meselement)
    if (pos == 'left'){
        audio.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();//for not reloading
    const mes = messageinput.value;
    append(`You: ${mes}`, 'right');
    socket.emit('send', mes);
    messageinput.value = "";
})

const name = prompt("Enter Your Name to join")//jaise hi join ho name mange
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})
socket.on('recieve', data => {//jab message ayega isse call kro
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name => {
    append(`${name} left the chat`, 'right')
})