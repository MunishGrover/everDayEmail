const express=require('express')
const router =express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator())

const User=require('../../models/User');

router.get('/test',(req,res)=>res.json({msg:"Users Works"}));

router.post('/register',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const company = req.body.company;
    const timezone = req.body.timezone;
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();

    let errors = req.validationErrors();
    if(errors){
        console.log(errors)
    }
    else{
        //donot make if email exist
        User.findOne({email:req.body.email})
            .then(user=>{
                if(user){
                    return res.status(400).json({email:'Email alredy exists'})
                }
                else{
                    const newUser=new User(
                        {
                            name:name,
                            email:email,
                            company:company,
                            timezone:timezone
                        }
                    );
                    newUser.save()
                        .then(user=>res.json(user))
                        .catch(err=>console.log(err))
                }
            })
    }
})


module.exports=router;