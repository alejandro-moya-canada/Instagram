const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");

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

exports.getUser = (req, res, next) => {
    console.log("ID USUARIO:  ", req.params.id);
    User.findById(req.params.id).then(user => {
        if (user) {
            res.status(201).json({
                message: "Get user",
                user: user
            });
        } else {
            res.status(401).json({
                message: "¡No se ha encontrado al usuario!"
            });
        }
    }).catch(err => {
        console.log("ERROR   "+err);
        return res.status(401).json({
            message: "¡No se ha encontrado al usuario!"
        });
    });
   
};

exports.getPostsByUser = (req, res, next) => {
    console.log("ID USUARIOOO:  ", req.params.id);
    let query = { creator: req.params.id }
    Post.find(query).then(post => {
        console.log("POSTSSSS:   ", post);
        res.status(201).json({
            message: "Get posts by user",
            posts: post
        });
    }).catch(err => {
        return res.status(401).json({
            message: "¡No se ha encontrado las publicaciones del usuario!"
        });
    });
};