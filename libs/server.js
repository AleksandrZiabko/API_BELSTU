import Config from '../config/config';

class Server {

    constructor(server) {
        this._server = server;
    }

    start() {
        this._server.listen(Config.getPortServer(), () => {
            console.log('API started');
        });
    }
}

module.exports = Server;