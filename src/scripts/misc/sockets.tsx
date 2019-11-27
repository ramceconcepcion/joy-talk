import io from 'socket.io-client';

export default {
    HOST_prod: 'wss://joytalk-server.herokuapp.com',
    HOST_dev: 'ws://localhost:5000',
    mode: 'prod',

    WebSocketInstance: null,
    connected: false,

    receiveCallback: null,
    runCallback: null,

    receiveChatCallback: null,
    receiveTypingCallback: null,
    receiveUserCallback: null,

    room: "default_room",

    getHost() {
        return this.mode === 'dev' ? this.HOST_dev : this.HOST_prod;
    },

    run() {
        this.WebSocketInstance = io.connect(this.getHost());
        //this.WebSocketInstance = io.connect(this.getHost(), { transport: ['websocket'] });

        this.WebSocketInstance.on('connect', () => {
            console.log('Connected to server.');
            this.connected = true;
            if (this.runCallback) this.runCallback(this.connected);
        });

        this.WebSocketInstance.on('message', data => {
            if (this.receiveChatCallback) this.receiveChatCallback(data);
        });

        this.WebSocketInstance.on('typing', data => {
            if (this.receiveTypingCallback) this.receiveTypingCallback(data);
        });

        this.WebSocketInstance.on('user', data => {
            if (this.receiveUserCallback) this.receiveUserCallback(data);
        });

        this.WebSocketInstance.on('disconnect', data => {
            console.log('Disconnected to server');
            this.connected = false;
            if (this.runCallback) this.runCallback(this.connected);
            //this.run();
        });
    },

    sendChat(data) {
        data.room = this.room;
        this.WebSocketInstance.emit('message', data);
    },

    sendTyping(data) {
        data.room = this.room;
        this.WebSocketInstance.emit('typing', data);
    },

    sendUser(data) {
        data.room = this.room;
        this.WebSocketInstance.emit('user', data);
    },
}