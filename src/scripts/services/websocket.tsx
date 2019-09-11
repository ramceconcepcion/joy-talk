import { send } from "q";

export default {
    HOST_prod: 'wss://joytalk-server.herokuapp.com',
    HOST_dev: 'wss://localhost:8000',
    mode: 'prod',

    ws: null,

    getHost() {
        return this.mode == 'dev' ? this.HOST_dev : this.HOST_prod;
    },

    run() {
        var HOST = this.getHost();
        this.ws = new WebSocket(HOST);

        this.ws.onopen = () => {
            console.log('Connected to server.')
        }

        this.ws.onclose = () => {
            console.log('Disconnected to server')
            this.ws = new WebSocket(HOST);
        }
    },

    setReceive(callback) {
        this.ws.onmessage = function (event) {
            console.log('Message received from server: ' + event.data);
            callback(event.data);
        };
    },

    send(data) {
        this.ws.send(JSON.stringify(data))
    }
}