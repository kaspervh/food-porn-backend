const auth = require('express')
const authRouter = auth.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


// will create a new mongo db user with an encrypted password
authRouter.post('/signup', async (req:any, res:any) => {
  //res.header("Access-Control-Allow-Origin", "*")
  // initialises bcrypt encryption
  const salt = await bcrypt.genSalt(10);

  // converts user password to encrypted string
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  

  const existingUser = await User.findOne({"email": req.body.email})
  console.log(existingUser)
 // if(existingUser.length !== 0 || typeof existingUser !== 'null') res.send({message: 'user with the email allready exists'})
  
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashPassword,
    userType: req.body.userType
  })

  try {
    const newUser = await user.save()
    console.log(newUser)
    res.send(newUser)
  } catch (error) {
    console.log(error)
  }
})

authRouter.post('/login', async (req:any, res:any) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('getting request')
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({"email": email})
  if(!user) res.send({message: 'user not found'})

  const validatePassword = await bcrypt.compare(password, user.password);
  if(!validatePassword) res.send({message: 'password is invalid'})

  const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);

  res.header("auth-token", token).send({token: token, id: user._id, username: user.username, message: 'user is loged in'}); 


})


module.exports = authRouter;