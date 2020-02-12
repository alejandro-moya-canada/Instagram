const path = require("path");
// importo el paquete express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");


// ejecuto el paquete
const app = express();

// conecto MONGODB con EXPRESS
mongoose.connect("mongodb+srv://alex:bosonit123@cluster0-haaol.mongodb.net/node-angular", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// recuperar imágenes por parte del servidor
app.use("/images", express.static(path.join("backend/storage/assets/public")));

app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/post", postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;