const express= require('express')

const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const messageRoutes = require('./routes/messageRoutes');


const app = express()
app.use(express.json())


app.use('/api/auth', authRoutes)
console.log("Auth routes loaded");
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes);
app.get('/',(req,res)=>{
    res.send("API is running")
})
app.get('/test',(req,res)=>{
    res.send('test route')
})
app.use(notFound);
app.use(errorHandler);

const http = require('http');
const { Server } = require('socket.io');
const socketHandler = require('./socket/socket');

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
});

// 🔥 Use socket folder
socketHandler(io);

server.listen(process.env.PORT || 8000, () => {
  console.log('Server running with Socket.io');
});