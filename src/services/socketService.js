import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

// Join a specific room
export function joinRoom(roomId) {
  socket.emit('join-document', roomId);
}

// Listen for the initial document state
export function onDocumentInit(callback) {
  socket.on('doc-init', callback);
}

// Listen for document updates from other clients
export function onDocumentUpdate(callback) {
  socket.on('doc-update', callback);
}

// Emit document updates to the server
export function sendDocumentUpdate(update) {
  socket.emit('doc-update', update);
}

export default socket;
