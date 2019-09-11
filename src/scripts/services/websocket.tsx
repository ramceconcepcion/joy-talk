export default {
    HOST_prod: 'ws://joytalk-server.herokuapp.com',
    HOST_dev: 'ws://localhost:3000',
    mode: 'dev',

    getHost() {
        return this.mode == 'dev' ? this.HOST_dev : this.HOST_prod;
    },

    run() {
        var HOST = this.getHost();
        var ws = new WebSocket(HOST);

        ws.onmessage = function (event) {
            console.log('Server time: ' + event.data);
        };
    }
}