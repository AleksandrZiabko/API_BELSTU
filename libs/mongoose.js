import mongoose from 'mongoose';
import Config from '../config/config';

class StartDB {

    connectDB() {
        mongoose.connect(Config.getUrlDb());
        return mongoose.connection
    }
}

module.exports = new StartDB;