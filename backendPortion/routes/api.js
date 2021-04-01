const express = require('express');
const router = express.Router();

const LocalStorage = require('node-localstorage').LocalStorage;  //storing in a local storage
const localStorage = new LocalStorage('./scratchToken');

const config = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');
const Newslist = require('../models/News')
const SportsList = require('../models/Sports')

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname+'/public'));

const session = require('express-session');
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.get('/news', function (req, res, next) {
    Newslist.find({}, (err, newsData) => {

        if (!err) {
            res.send(newsData);
        }
        else {
            res.json(err);
        }

    });
});


router.post('/sports', function (req, res, next) {
    const sportsDao = new SportsList(req.body);
    sportsDao.save((err, data) => {
        //save
        if (!err) {
            const status = {
                msg: 'News Added Successfully'
            }
            console.log("News has been saved");
            res.json(status)

        }
        else {
            res.json(err)

        }
    });

});


router.get('/sports', function (req, res, next) {
    SportsList.find({}, (err, newsData) => {

        if (!err) {
            res.send(newsData);
        }
        else {
            res.json(err);
        }

    });
});

module.exports = router


