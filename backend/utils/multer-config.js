//configuration de multer
//est un middleware node.js, principalement utilisé pour télécharger des fichiers
const multer = require('multer');

//objet dictionnaire - sert pour l'extension du fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'images/gif': 'gif'
};

const storageUsers = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/users'); //ou sont sauvegardés les fichiers
    },
    filename: (req, file, callback) => { //va expliquer à multer quel nom de fichier utiliser
        const extension = MIME_TYPES[file.mimetype] //extension du fichier
        const name = file.originalname.split(' ').join('_').replace("." + extension, "")
        callback(null, name + Date.now() + '.' + extension)
    }
});

const storagePosts = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/posts'); //ou sont sauvegardés les fichiers
    },
    filename: (req, file, callback) => { //va expliquer à multer quel nom de fichier utiliser
        const extension = MIME_TYPES[file.mimetype]; //extension du fichier
        const name = file.originalname.split(' ').join('_').replace("." + extension, "")
        callback(null, name + Date.now() + '.' + extension);
    }
});


exports.users = multer({ storage: storageUsers }).single('imageuser'); //single pour fichier unique
exports.posts = multer({ storage: storagePosts }).single('attachment');