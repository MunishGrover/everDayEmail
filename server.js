const express = require('express');
const mongoose=require('mongoose')

const users=require('./routes/api/users')
const User=require('./models/User');

const app = express();
var cron =require('node-cron')



app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB config
const db=require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err=>console.log(err))



app.post('/saveData',function (req, res) {
   console.log(req.body.name,req.body.email,req.body.cp,req.body.tz);
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();

});
//cron job
//donot make if email exist

User.find({})
    .then(user=>{
        if(user){
          user.forEach((user)=>{
               
              cron.schedule('00 8 * * *', () => {
                   //this will be replaced by nodemailer API
                  console.log(`Good Morning email 08:00 at ${user.timezone} timezone for ${user.name}`);
              }, {

                  timezone: user.timezone
              });
          })
        }
        else{
            console.log('Enter Users')
        }
    })






//Use routes
app.use('/api/users',users)


/*
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('public'))
}
*/

const port=process.env.PORT || 5000;

app.listen(port, function(){
    console.log("Server running on port 5000")
});
