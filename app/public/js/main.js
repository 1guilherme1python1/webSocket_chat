const socket = io();

let username = '';
let userList = [];

let loginPage = document.querySelector('#loginPage');
let chatPage = document.querySelector('#chatPage');

let loginInput = document.querySelector('#loginNameInput');
let textInput = document.querySelector('#chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

function addMessage(type, user, msg){
    let ul = document.querySelector('.chatList');

    switch(type){
        case 'status':
            ul.innerHTML += '<li class="m-status">'+' '+msg+'</li>';
        break;
        case 'msg':
            ul.innerHTML += '<li class="m-txt"><span>'+user+'</span>'+msg+'</li>';
        break;
    }
}

function renderUserList(){
    let ul = document.querySelector('.userList');
    ul.innerHTML = '';
    userList.forEach(i =>{
        ul.innerHTML += '<li>'+i+'</li>';
    })
}

loginInput.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
        let name = loginInput.value.trim();
        if(name != ''){
            username = name;
            document.title = `Chat - ${username}`;

            socket.emit('join-request', username)
        }
    }
})
textInput.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13){
        let txt = textInput.value.trim();
        textInput.value = '';

        if(txt != ''){
            socket.emit('send-msg', txt, username);
        }
    }
})
socket.on('user-ok', (list)=>{
    loginPage.style.display = 'none';
    chatPage.style.display = 'flex';
    textInput.focus();

    addMessage('status', null, 'conectado!');

    userList = list;

    renderUserList();
});
socket.on('list-update', (data)=>{

    if(data.joinend){
        addMessage('status', null, data.joinend+'entrou no chat.');
    }
    // if(data.joinend){
    //     addMessage('status', null, data.joinend+'saiu do chat');
    // }

    userList = data.list;
    renderUserList();
})

let sair = document.querySelector('.sair-logout');

sair.addEventListener('click', ()=>{
    socket.on('disconnect', username);
    loginPage.style.display = 'flex';
    chatPage.style.display = 'none';
    socket.on('disconnet', (data)=>{
    userList = data.list; 
    renderUserList();   
    })
})

socket.on('show-msg', (data)=>{
    addMessage('msg', data.username, data.message);
})