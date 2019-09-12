export default {
    HOST_prod: 'wss://joytalk-server.herokuapp.com',
    HOST_dev: 'wss://localhost:8000',
    mode: 'prod',

    ws: null,

    receiveCallback: null,
    runCallback: null,

    getHost() {
        return this.mode == 'dev' ? this.HOST_dev : this.HOST_prod;
    },

    run(callback) {
        var HOST = this.getHost();
        this.ws = new WebSocket(HOST);
        this.runCallback = callback;

        this.ws.onopen = () => {
            console.log('Connected to server.');
            this.runCallback(true, this);
        }

        this.ws.onclose = () => {
            console.log('Disconnected to server');
            this.runCallback(false, this);
            this.run(this.runCallback)
        }

        this.ws.onmessage = (event) => {
            if (this.receiveCallback) this.receiveCallback(event.data);
        };
    },

    setReceive(callback) {
        this.receiveCallback = callback;
        this.ws.onmessage = (event) => {
            this.receiveCallback(event.data);
        };
    },

    send(data) {
        this.ws.send(JSON.stringify(data))
    }
}