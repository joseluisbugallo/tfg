const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/config");

//Cargamos la validacion
const validateRegisterInput = require("../validation/registroValidator");
const validateLoginInput = require("../validation/loginValidator");

//Cargamos el modelo del usuario
const User = require("../models/User");

// Ruta de registro
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Valdiamos los campos
    const { errors, isValid } = validateRegisterInput(req.body);
    // Comprobamos si son validos
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Comprobamos si ya existe un usuario con ese nombre de usuario
    User.findOne({ usuario: req.body.usuario }).then(user => {
        if (user) {
            return res.status(400).json({ usuario: "El nombre de usuario ya existe" });
        } else {
            const newUser = new User({
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// Ruta de login
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Validamos los campos
    const { errors, isValid } = validateLoginInput(req.body);
    // Comprobamos la respuesta
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const usuario = req.body.usuario;
    const password = req.body.password;
    // Buscamos el usuario
    User.findOne({ usuario }).then(user => {
        // Comprobamos si existe
        if (!user) {
            return res.status(404).json({ usuario: "El usuario no existe! Ve a registro para crear una cuenta" });
        }
        // Comprobamos la password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Contraseña correcta
                // Creamos el JWT payload 
                const payload = {
                    id: user.id,
                    name: user.nombre
                };
                // Token sign
                jwt.sign(
                    payload,
                    config.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 año en segundos
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Contraseña incorrecta" });
            }
        });
    });
});

module.exports = router;