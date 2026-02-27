module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId);
    });

    socket.on('sendMessage', ({ senderId, receiverId, content }) => {
      io.to(receiverId).emit('receiveMessage', {
        senderId,
        content,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

};