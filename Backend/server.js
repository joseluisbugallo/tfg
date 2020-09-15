const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Añadimos las rutas de usuarios
const users = require("./routes/users")

const app = express();
const portSocket = 5001;
const io = require("socket.io")(portSocket);

//Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// DB connect
mongoose.connect(
    require("./config/config").mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log("MongoDB conectado correctamente"))
    .catch(err => console.log(err));

// Añadimos el middleware de passport
app.use(passport.initialize());

// Añadimos la configuracion de passport
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);




// Cogemos el puerto si existe (archivo env) y sino definimos el que usar
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Servidor de backend nodejs corriendo en el puerto:', port));




io.on('connection', (socket) => {
    // here you can start emitting events to the client 
    console.log("New client connected");
    
    socket.on('time', (interval) => {
            console.log('Cliente conectado al servidor con un intervalo de:', interval);
            setInterval(() => {
                socket.emit('timer', new Date());
            }, interval);
        }
    );

});



// Se puede pasar el puerto en las opciones del require y ya genera solo el servidor implicitamente
//const portSocket = 5001;
//io.listen(portSocket);
console.log('Servidor de Socketio corriendo en el puerto: ', portSocket);