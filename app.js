const express = require('express');
const path = require('path');
const moment = require('moment');
const RequestLog = require('./models/request_log');

const app = express();
require('mongoose').connect('mongodb://localhost/poster');

require('dotenv').config();
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER
});

app.use((req, res, next) => {
    let requestTime = Date.now();
    res.on('finish', () => {
        if (req.path === '/analytics') {
            return;
        }

        RequestLog.create({
            url: req.path,
            method: req.method,
            responseTime: (Date.now() - requestTime) / 1000, // convert to seconds
            day: moment(requestTime).format("dddd"),
            hour: moment(requestTime).hour()
        });

        require('./analytics_service').getAnalytics()
            .then(analytics => pusher.trigger('analytics', 'updated', {analytics}));
    });
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
require('hbs').registerHelper('toJson', data => JSON.stringify(data));
app.set('view engine', 'hbs');

app.get('/wait/:seconds', async (req, res, next) => {
    await ((seconds) => {
        return new Promise(resolve => {
            setTimeout(
                () => resolve(res.send(`Waited for ${seconds} seconds`)),
                seconds * 1000
            )
        });
    })(req.params.seconds);
});

app.get('/analytics', (req, res, next) => {
    require('./analytics_service').getAnalytics()
        .then(analytics => res.render('analytics', { analytics }));
});

module.exports = app;
