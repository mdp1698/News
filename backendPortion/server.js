const app = require('./app')
const express = require('express')


const bodyParser =  require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const session = require('express-session')
app.use(session({
  secret: 'adminSecret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs')
app.set('views', './views')

const Newslist = require('./models/News')

let sess;

app.get('/',(req,res) => {
    sess=req.session;
    sess.email=" "
   
    res.render('signin',
      { invalid: req.query.invalid?req.query.invalid:'',
        msg: req.query.msg?req.query.msg:''})
    
})



app.get('/api/getLatestNews', (req,res) => {

  Newslist.find({}).limit(3).sort( {insertTime: -1} ).exec((err,data)=>{
    if (err) res.status(500).send(err)
    else res.json(data)
  })

})
