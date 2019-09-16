import io from 'socket.io-client';

export default {
    HOST_prod: 'wss://joytalk-server.herokuapp.com',
    HOST_dev: 'wss://localhost:8080/chat',
    mode: 'prod',

    WebSocketInstance: null,
    connected: false,

    receiveCallback: null,
    runCallback: null,

    getHost() {
        return this.mode == 'dev' ? this.HOST_dev : this.HOST_prod;
    },

    run() {
        this.WebSocketInstance = io.connect(this.getHost());

        this.WebSocketInstance.onopen = () => {
            console.log('Connected to server.');
            this.connected = true;
            if (this.runCallback) this.runCallback(this.connected);
        }

        this.WebSocketInstance.onclose = () => {
            console.log('Disconnected to server');
            this.connected = false;
            if (this.runCallback) this.runCallback(this.connected);
            this.run();
        }

        this.WebSocketInstance.onmessage = (event) => {
            if (this.receiveCallback) this.receiveCallback(event.data);
        };
    },

    setReceive(callback) {
        this.receiveCallback = callback;
        this.WebSocketInstance.onmessage = (event) => {
            this.receiveCallback(event.data);
        };
    },

    send(data) {
        this.WebSocketInstance.send(JSON.stringify(data))
    },

    sendChat(data) {

    },

    sendTyping(data) {

    },

    sendUser(data) {

    },
}