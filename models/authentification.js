import RegUser from '../models/registration';
import bcryptjs from 'bcryptjs';

class Authentification {

    async authUser(login) {
        return await RegUser.findOne({login: login}, (err, res) => !res ? false : res);
    }
}

module.exports = new Authentification