import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
            login: {
                type: String,
                unique: true,
                required: true
            },
            pass: {
                type: String,
                required: true
            },
            admin: {
                type: Number,
                required: true
            },
            fname: {
                type: String,
                required: true
            },
            sname: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            groupe: {
                type: Number,
                required: true
            },
            podgroupe: {
                type: Number,
                required: true
            }
});

userSchema.statics.hashMD5 = async (password) => {
    let passMD5 = await bcryptjs.hash(password , 8);
    return passMD5
};

userSchema.statics.toLatin = str => {
    const rus = ['Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э'];
    const lat = ['Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','','','\'','\'','E', 'e'];
    for (let i in rus) {
        let reg = new RegExp(rus[i], 'g');
        str = str.replace(reg, lat[i]);
    }
    return str;
}

module.exports = mongoose.model('User', userSchema);