// importo el archivo app.js
const app = require("./backend/app");
// importo el debug
const debug = require("debug")("node-angular");
// importo la librería http
const http = require("http");

// aseguro de que el puerto sea un numero valido
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

// verifico el tipo de error que ha ocurrido
const onError = error => {
    if(error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// imprimo donde se registran las solicitudes entrantes
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};

// configuro el puerto estableciendo el puerto 3000 como el predeterminado
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
// controlador de errores
server.on("error", onError);
// controlador de escucha
server.on("listening", onListening);
server.listen(port);

// 3000 es el puerto que habilito para escuchar
// accedo a la variable de entorno con el proceso .env
