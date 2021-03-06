import fs from 'fs';
import mkdirp from 'mkdirp';
import RegUser from '../models/registration';

const dir = './public/';

class Registration {

     async reg({body}, res) {
        const user = new RegUser({
            login: body.login,
            pass: await RegUser.hashMD5(body.pass),
            admin: body.admin,
            fname: body.fname,
            sname: body.sname,
            year: body.year,
            groupe: body.groupe,
            podgroupe: body.podgroupe

        });
        user.save()
            .then(() => {
            if(!fs.existsSync(dir + `${body.year}/${body.groupe}/${body.podgroupe}/${RegUser.toLatin(body.fname + ' ' + body.sname)}`)) {
                mkdirp(dir + `${body.year}/${body.groupe}/${body.podgroupe}/${RegUser.toLatin(body.fname + ' ' + body.sname)}`, err => err && console.error(err))
            }
            console.log('USER ADDED!')
            res.send({
              status: true,
              date: new Date()
            });

        })
            .catch((err) => res.send({
              status: false,
              date: new Date()
            }))


    }
}

module.exports = new Registration;
