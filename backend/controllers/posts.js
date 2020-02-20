const Post = require("../models/post");
const User = require("../models/user");


// función de añadir los datos de las publicaciones
exports.createPost = (req, res, next) => {
    console.log("Entro en crear publicaciones en el servidor");
    const url = req.protocol + '://' + req.get("host");
    console.log("URL:   ", url);

    console.log("REQ. FILE:   ", req.file);
    console.log("REQ.BODY:   ", req.body);
    console.log("POST DATA:   ", req.body.postInfo);


    const post = new Post({
        contenido: req.body.contenido,
        image: url + "/images/" + req.body.titulo,
        fechaCreacion: req.body.fechaCreacion
    });

    console.log("POST:  ", post);

    post.save().then(createdPost => {
        console.log("createdPost:  " + createdPost);
        console.log("ID DE LA PUBLICACION:   ", createdPost._id)

        res.status(201).json({
            message: "Publicación añadida!",
            post: {
                ...createdPost,
                id: createdPost._id
            }
        });
    })
        .catch(error => {
            res.status(500).json({
                message: "Ha ocurrido un error en la creación!"
            })
        });


}

exports.getPosts = (req, res, next) => {
    console.log("Llego a getPost");
    let postQuery;
    Post.find().then(query => {
        let posts = [];
        const promise = new Promise((resolve, reject) => {
            query.forEach((element, index, array) => {
                User.findById(element.creator).then(user => {
                    postData = {
                        user: {id: user.id, nombre: user.nombre, nick: user.nick, apellido: user.apellido},
                        post: element
                    }
                    posts.push(postData);
                    posts.reverse();
                    if (index === array.length -1) resolve(posts);
                })
            })
        })
        promise.then(Response => {
            res.status(201).json({
                message: "Get all",
                posts: posts
            });
        })
    });


}
