const Post = require("../models/post");

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

    console.log("POST:  ",post);

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
    })
    .catch(error => {
        res.status(500).json({
            message: "Ha ocurrido un error en la creación!"
        })
    });
    
    
}

exports.getPosts = (req, res, next) => {
    console.log("Llego a getPost");
    const postQuery = Post.find();
    let postsActualizados;

    postQuery.then(documents => {
        postsActualizados = documents;
        console.log("POSTS ACTALES:  ", postsActualizados);
        return Post.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Posts fetched succesfully!",
            posts: postsActualizados
        });
        console.log("Get de las publicaciones");
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching posts failed!"
        })
    });
    
}