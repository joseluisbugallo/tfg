const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creamos el "schema" de nuestro usuario

const UserSchema =  new Schema(
    {
        usuario:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        nombre:{
            type: String,
            required: false
        },
        date:{
            type: Date,
            default: Date.now
        },
        amigos:{
            type: Array,
            required: false
        },
    }
);

module.exports = User = mongoose.model("users", UserSchema);