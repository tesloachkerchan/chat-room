import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';
const socket = io.connect('http://localhost:3001');
function App() {
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState('')
  const [showChat, setShowChat] = useState(false)
  
  const joinRoom = (e) => {
    e.preventDefault()
    if (username !== '' && roomId !== '') {
      socket.emit('join_room', roomId)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ?
        (
        <div className='joinChatContainer'>
          <h3>Join A Chat</h3>
          <input
            type='text'
            placeholder='Name of Romm'
            onChange={(e) => { setUsername(e.target.value) }}
          />
          <input
            type='text'
            placeholder='Room Id...'
            onChange={(e) => { setRoomId(e.target.value) }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
        )
        :
        (
          <Chat socket={socket} username={username} roomId={roomId} />
        )
      }
      
    </div>
  );
}

export default App;
