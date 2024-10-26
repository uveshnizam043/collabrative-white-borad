import { io } from 'socket.io-client'

const socket = io('http://localhost:8000')

// Listen for a connection event to confirm connection
socket.on('connect', () => {
  console.log('Connected to the server with ID:', socket.id)
})
export default socket