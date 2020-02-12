console.log("ENTRO EN EL FICHERO FILE.JS");

const multer = require("multer");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};

const storage = multer.diskStorage({
    dest: './storage/assets/public'
});

module.exports = multer({ storage: storage }).single("image");