const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_GMAIL,
        pass: process.env.EMAIL_GMAIL_PASSWORD
    }
});

const enviarCodigoPorCorreo = async (destinatario, codigo) => {
    const mailOptions = {
        from: `"Alzhivida" <${process.env.EMAIL_GMAIL}>`,
        to: destinatario,
        subject: 'Código de Verificación',
        html: `<p>Tu código de verificación es: <strong>${codigo}</strong></p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};

const enviarCodigoPorCorreoContrasena = async (destinatario, codigo) => {
    const mailOptions = {
        from: `"Alzhivida" <${process.env.EMAIL_GMAIL}>`,
        to: destinatario,
        subject: 'Código de Recuperación de Contraseña',
        html: `<p>Tu código de recuperación de contraseña es: <strong>${codigo}</strong></p>`
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }

}

module.exports = { enviarCodigoPorCorreo, enviarCodigoPorCorreoContrasena }

// const {Resend } = require('resend')
// require('dotenv').config()

// const resend = new Resend(process.env.RESEND_API_KEY)

// const enviarCodigoPorCorreo = async (destinatario, codigo) => {
//     try{
//         const data = await resend.emails.send({
//             from: 'onboarding@resend.dev',
//             to: destinatario,
//             subject: '¡Bienvenido a Alzhivida!',
//             html: `<p>Tu código de verificación es: <strong>${codigo}</strong></p>`
//         })

//         return data
//     }catch(err){
//         console.error("Existe un error al enviar el correo: ", err)
//         throw err
//     }

// }

// module.exports = {enviarCodigoPorCorreo}


