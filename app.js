const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require('fs');
const app = express();
const port = 80;


// MongoDb

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.CONN);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    decs: String
  });

  const contact = mongoose.model('contact', contactSchema);

// End Mongodb

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF

app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {'title':'Dance academy'}
    res.status(200).render('home.pug',params)
})
app.get('/contact', (req, res)=>{
    
    const params = {'title':'Dance academy'}
    res.status(200).render('contact.pug',params)
})
app.post('/contact', (req, res)=>{
    

    
    const data = new contact({ 
        name:req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
         address: req.body.address,
         decs: req.body.decs 
        });
    data.save();
    res.status(200).render('contact.pug')
})


// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})
