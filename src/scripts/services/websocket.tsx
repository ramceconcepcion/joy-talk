import { send } from "q";

export default {
    HOST_prod: 'wss://joytalk-server.herokuapp.com',
    HOST_dev: 'wss://localhost:8000',
    mode: 'prod',

    ws: null,

    getHost() {
        return this.mode == 'dev' ? this.HOST_dev : this.HOST_prod;
    },

    run(connectionCb) {
        var HOST = this.getHost();
        this.ws = new WebSocket(HOST);

        this.ws.onopen = () => {
            console.log('Connected to server.');
            connectionCb(true);
        }

        this.ws.onclose = () => {
            console.log('Disconnected to server');
            connectionCb(false);
            this.run(connectionCb)
        }
    },

    setReceive(callback) {
        this.ws.onmessage = function (event) {
            callback(event.data);
        };
    },

    send(data) {
        this.ws.send(JSON.stringify(data))
    }
}