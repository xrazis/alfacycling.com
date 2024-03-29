const express = require('express'),
    router = express.Router();

const creds = require('../config/keys');
const transporter = require('../connections/mailer_conn');

const {showAllFromDatabase} = require('../actions/db_actions_blogs');

router.post('/index', (req, res) => {
    const {email, subject, name, message} = req.body;

    const mail = {
        from: email,
        to: creds.email_user,
        subject: subject + ' from ' + name,
        text: message
    };

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/index');
        }
    });
});

router.get('/', (req, res) => {
    res.redirect('/index');
});

router.get('/index', async (req, res) => {
    res.render('index', {
        blogs: await showAllFromDatabase(1)
    });
});

router.get('/gallery', (req, res) => {
    res.render('gallery');
});

module.exports = router;
