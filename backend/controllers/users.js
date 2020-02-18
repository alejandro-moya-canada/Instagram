const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    // busco un usuario por su email
    User.findOne({ email: req.body.email }).then(user => {
        console.log("USUARIO BUSCADO:  ", user);
        // compruebo si ha encontrado el usuario
        if(!user) {
            return res.status(401).json({
                message: "Inicio de sesión fallido"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        // compruebo si ha encontrado el usuario
        if(!result) {
            return res.status(401).json({
                message: "Inicio de sesión fallido"
            });
        }
        // creo un nuevo token con jwt
        // segundo argumento es la contraseña que se encuentra en el archivo nodemon.js
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "secret_this_should_be_longer", { expiresIn: "1h" });
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });
    }).catch(err => {
        console.log("ERROR   "+err);
        return res.status(401).json({
            message: "¡Credenciales incorrectas!"
        });
    })
}

exports.perfilUsuario = (req, res, next) => {
    console.log("LLEGO AL GET USUARIO");
    console.log("REQ BODDDDY:  ",  req.body);
    let user;

    User.findById(req.params.id).then(usuario => {
        
    })
}