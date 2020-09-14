const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convertimos los campos vacios a un string vacio para poder pasarlos por el validador
    data.usuario = !isEmpty(data.usuario) ? data.usuario : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";


    // Usuario
    if (Validator.isEmpty(data.usuario)) {
        errors.name = "El usuario es un campo obligatorio";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "La contraseña es un campo obligatorio";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "El campo de confirmar contraseña es obligatorio";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "La contraseña ha de tener al menos 6 caracteres";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Las contraseñas no coinciden!";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};