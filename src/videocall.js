import React from 'react';
import Peer from 'peerjs';
import './style.css';

class VideoCall extends React.Component{

constructor(props){
    super(props);
    this.state = {
        username: this.props.username,
        callto: this.props.callto,
        localStream : null,
        peer: null,
       
    }
    // this.localvideo = document.getElementById('local-video');
    // this.remotevideo = document.getElementById('remote-video');
     //this.localvideo.style.opacity =0;
     //this.remotevideo.style.opacity =0;
     //this.localvideo.onplaying = () => {  this.localvideo.style.opacity =1  };
     //this.remotevideo.onplaying = () => {  this.remotevideo.style.opacity =1  };

}


render(){
    return (
        <div>
          <div><div>Enter username to start video call</div> </div>
        <div>
        <div>
         <label>UserName : <input type='text' ref='username' defaultValue = {this.state.username}></input></label>
         </div>
         <div><button onClick = {this.Login} >Login</button></div>
       </div>
       <div>
        <div>
        <label>call To UserName : <input type='text' ref='callto' defaultValue = {this.state.callto}></input></label>
        </div>
      <div><button onClick = {this.StartCall} >Call</button></div>
       </div>
       <div>
        <div>
        <div>
       <video className="secondry-video" autoPlay id="remote-video"></video>
       <video className="primary-video" autoPlay muted id="local-video"></video>
       </div>
       </div></div>
        </div>
      );

}

Login=()=>{

    var username = this.refs.username.value;
    this.init(username);
    console.log(username);

}

StartCall=()=>{

    var otherusername = this.refs.callto.value;

   // let localvideo = document.getElementById('local-video');
  //  let remotevideo = document.getElementById('remote-video');
    this.startCall(otherusername);
    console.log(otherusername);
}


startCall(otherUserId){

    let localvideo = document.getElementById('local-video');
    let remotevideo = document.getElementById('remote-video');

    navigator.getUserMedia({
               audio: true,
               video: true
           },(stream)=>{
               localvideo.srcObject = stream;
               this.setState({localStream:stream});

               const peer = this.state.peer;
               const call = peer.call(otherUserId, stream);
               call.on('stream', (remoteStream)=>{
                remotevideo.srcObject = remoteStream;
                remotevideo.className = 'primary-video';
                localvideo.className = 'secondry-video';
                   
               })
   
           });
   
   }

init(userId)
{
     const peer = new Peer(userId,{
        host: 'mhs-peerj-sserver.azurewebsites.net',
        port : 443,
        path: 'peerjs'
    });
    peer.on('open',()=>{


    });
    this.setState({peer:peer});
    this.listen(peer);
}


listen(peer)
{
   let localvideo = document.getElementById('local-video');
   let remotevideo = document.getElementById('remote-video');

    peer.on('call', (call)=>{

        navigator.getUserMedia({
            audio: true,
            video: true
        },(stream)=>{
            localvideo.srcObject = stream;
            this.setState({localStream:stream});

            call.answer(stream);
            call.on('stream', (remoteStream)=>{
                remotevideo.srcObject = remoteStream;
                remotevideo.className = 'primary-video';
                localvideo.className = 'secondry-video';
                
            })
        });
    });
}



}

export default VideoCall