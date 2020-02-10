const Post = require("../models/post");

// función de añadir los datos de las publicaciones
exports.createPost = (req, res, next) => {
    console.log("Entro en crear publicaciones en el servidor");
    const url = req.protocol + '://' + req.get("host");
    console.log("URL:   ", url);

    const post = new Post({
        contenido: req.body.contenido,
        image: url + "/images/" + req.body.titulo,
        fechaCreacion: req.body.fechaCreacion,
    });

    console.log("POST:  ",post);
    console.log("RUTA DE LA IMAGEN:  ", url + "/images/" + req.body.image.name);
    console.log("RUTA DE LA IMAGEN:  ", url + "/images/" + req.file);

    post.save().then(createdPost => {
        console.log("createdPost:  "+createdPost);
        console.log("ID DE LA PUBLICACION:   ", createdPost._id)

        res.status(201).json({
            message: "Publicación añadida!",
            post: {
                ...createdPost,
                id: createdPost._id
            }
        });
    });
    /*
    .catch(error => {
        res.status(500).json({
            message: "Ha ocurrido un error en la creación!"
        })
    });
    */
}