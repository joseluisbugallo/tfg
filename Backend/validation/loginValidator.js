const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.usuario = !isEmpty(data.usuario) ? data.usuario : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Usuario
    if (Validator.isEmpty(data.usuario)) {
        errors.name = "El usuario es un campo obligatorio";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "La contraseña es un campo obligatorio";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};