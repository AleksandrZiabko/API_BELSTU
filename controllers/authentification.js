import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import AuthUser from '../models/authentification';
import key from '../config/secret';

class Authentification {

    async auth({body}, res) {
        const user = await AuthUser.authUser(body.login);
        if(!user) {
          res.send({
            status: false,
            date: new Date()
          })
        } else {
            bcryptjs.compare(body.password, user.pass, (err, result) => {
                if(result) {
                    let token = jsonwebtoken.sign({ id: user._id }, key.secret, {
                        expiresIn: 86400
                    });
                    res.send({
                      status: true,
                      data: {
                        token: token,
                        userData: user
                      }
                    })
                } else {
                    res.send({
                      status: false,
                      date: new Date()
                    })
                }
            });
        }
    }
}

module.exports = new Authentification;
