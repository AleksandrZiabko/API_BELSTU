import config_file from './config.json';

class Config {

    getUrlDb() {
        return config_file.db_url
    }

    getPortServer() {
        return config_file.server_port
    }
}

module.exports = new Config();