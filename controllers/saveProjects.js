import fs from 'fs';
import mkdirp from 'mkdirp';
import RegUser from '../models/registration';

const dir = './public/';

class saveController {
  saveProject(req, res) {
    let file = req.files.file;
    let path = JSON.parse(JSON.stringify(this.createPath(JSON.parse(req.body.dataCookies), req.body.path)));
    if (!fs.existsSync(path.path)){
        fs.mkdirSync(path.path);
    }
      file.mv(path.path + path.nameFile, (err) => {
        if (err) {
          console.log(err)
          return res.sendStatus(500);
        } else {
            res.sendStatus(200)
      }
    });
    }

    createPath({year, groupe, podgroupe, fname, sname}, filePath) {
      let nameProject = filePath.substring(0,filePath.lastIndexOf('/') + 1);
      let nameFile = filePath.substring(filePath.lastIndexOf('/') + 1);
      let pathToProject = dir + year + '/' + groupe + '/' + podgroupe + '/' + this.toLatin(decodeURI(fname) + ' ' + decodeURI(sname)) + '/';
      return {
        path: pathToProject + nameProject,
        nameFile: nameFile
      }
    }

  toLatin(str) {
    const rus = ['Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э'];
    const lat = ['Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','','','\'','\'','E', 'e'];
    for (let i in rus) {
        let reg = new RegExp(rus[i], 'g');
        str = str.replace(reg, lat[i]);
    }
    return str;
  }

}

module.exports = new saveController;
