const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');
const Message = require('./models/Message');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: authMiddleware
	});
	await server.start();
	server.applyMiddleware({ app });
	console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

io.use((socket, next) => {
	sessionMiddleware(socket.request, socket.request.res || {}, next);
})
startServer();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// socket.io Start

// track who is online and in what room for socket.io
const users = {};

// when new user connects to the server
io.on('connection', (socket) => {
	// listen for a user attempting to open a notification based on the user id
	socket.on('request-chat-list', async (data) => {
		const userId = socket.request.session.user_id;
		const chatListRoom = userId + 'x';
		socket.join(chatListRoom);
		
		const listOfChats = await chatListRoom(userId);
		io.to(chatListRoom).emit('populate-list', listOfChats);
	})

	// listen for a user joining a chat room with another user based on both userId's
	socket.on('joinroom', async (data) => {
		// get id's for both users from client
		const [sender, receiver] = data.room.split('x');
		// verify
		if (socket.request.session.userId != sender || sender == receiver) return;

		//format the room name based on which user ID is lowest
		const room = 
			parseInt(sender) < parseInt(receiver)
			? `${sender}x${receiver}`
			: `${receiver}x${sender}`;
		// update list of 'active' chat users with that room they're in
		users[sender] = room;

		// we know user1 exists because it comes from request session data
    // now check that user2 exists before proceeding
    const receivingUser = await User.findByPk(receiver);
    if (!receivingUser) return;
		socket.join(room);
		// find all messages for room
		const messages = await Message.find({
			room: room
		})
	})
})

/* When front-end is ready to build we will use this to serve it
if(process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
*/

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	});
});