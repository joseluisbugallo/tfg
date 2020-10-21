//Para conectarme al servidor de correo electronico para recuperar contraseñas etc
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.hostSmtp,
    port: process.env.portSmtp,
    secure: true, // use TLS
    auth: {
        user: process.env.emailUser,
        pass: process.env.emailPassword
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

module.exports = function sendEmail(data) {

    var mailOptions = {
        from: '"My Party Room" <>',
        to: data.email,
        subject: 'Recuperar Contraseña',
        text: 'Haz click en el enlace de abajo para recuperar tu contraseña',
        html: '<h1>Dale aqui:</h1> <a href="https://mypartyroom.ddns.net/"> <b> Recuperar contraseña </b> </a>',

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error + "ALGOO");
            
        }
        else {
            console.log(
                "info "+ info.response
            );
            
        }

    });

}


