const nodemailer = require('../config/nodemailer');

// This is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer', comment);
    nodemailer.transporter.sendMail({
        from: 'speedkingraghu@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!!",
        html: '<h1>Great, Your comment is now Published</h1>'
    }, (err, info) => {
        if (err) {
            console.log('Error in sending the mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}