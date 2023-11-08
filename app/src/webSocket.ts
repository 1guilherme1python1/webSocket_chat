import { io } from "./http";


let connectedUser:any = [];
let user:any = []; 

io.on("connection", (socket)=>{
    console.log('concexão detectada');
    //comando on é um evento escutador listener
    socket.on('join-request', (username:string)=>{
        let userExists = connectedUser.find((user: { username: any; }) => user.username);
        if(!userExists){
            connectedUser.push(username);
        }
        console.log(connectedUser);
        
        socket.emit('user-ok', connectedUser);
        socket.broadcast.emit('list-update', {
            joinend: username,
            list: connectedUser
        });// mensagem para todos clients menos para o usuário da conexão
        //pois foi feito o envio pelo emit a cima 
    })
    // objetivos: remover o username da lista,
    socket.on('disconnect', (username)=>{
        connectedUser = connectedUser.filter((user:any) => user != username);
        console.log(username);
        socket.broadcast.emit('list-update', {
            letft: username,
            list: connectedUser
        });
    })
    socket.on('send-msg', (txt, username)=>{
        let obj = {
            message:txt,
            username: username
        }
        socket.emit('show-msg', obj);
        socket.broadcast.emit('show-msg', obj);
    });

});