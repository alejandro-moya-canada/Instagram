const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        /*
        console.log("AHORA BUSCO AL USUARIO CREADO");
        User.findOne({ email: userInfo.email }).then(user => {
            console.log("USUARIOOOOO: ", user);
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed!"
                });
            } 
            fetchedUser = user;
            return fetchedUser;
            })
            .then(result => {
                if (!result) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                // creo un nuevo token con jwt
                // segundo argumento es la contraseña que se encuentra en el archivo nodemon.js
                const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "secret_this_should_be_longer", { expiresIn: "1h" });
                console.log("TOKENNNN: ",token);
                res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    userId: fetchedUser._id
                });
            })
        */

    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error en la creación de usuario!"
        })
    }

    return res.json({ "Status": 200 });
});

router.post("/login", UserController.userLogin);


module.exports = router;