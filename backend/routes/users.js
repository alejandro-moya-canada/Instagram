const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const router = express.Router();
const upload = multer({ dest: 'backend/storage/assets/user' });

const User = require("../models/user");
const UserController = require("../controllers/users");


router.post('/signup', upload.single('file'), (req, res, next) => {

    console.log("BODY:  ", req.body);
    const userInfo = JSON.parse(req.body.userInfo);
    console.log("JSON USUARIO:  ", userInfo);
    
    try {
        bcrypt.hash(userInfo.password, 10).then(hash => {
            user = new User({
                email: userInfo.email,
                nombre: userInfo.nombre,
                apellido: userInfo.apellido,
                nick: userInfo.nick,
                password: hash
            });

            console.log("USUARIO JWT:  ", user);
            user.save().then(userCreated => {
                console.log("CREATED:  ", userCreated);
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error en la creación de usuario!"
        })
    }

    return res.json({ "Status": 200 });
});

router.post("/login", UserController.userLogin);


module.exports = router;