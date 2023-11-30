const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const schema = mongoose.Schema;

const userSchema = new schema({
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps: true});

//Static signup
userSchema.statics.signup = async function (mail, password){

  if(!mail || !password){
    throw Error ("All fields must be filled")
  }

  if(!validator.isEmail(mail)){
    throw Error("Email is Invalid")
  }

  if(!validator.isStrongPassword(password)){
    throw Error("Password strength is low")
  }

  const exists = await this.findOne({ mail });

  if (exists) {
    throw Error("Email is already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ mail, password: hash });

  return user;
};

//static login 
userSchema.statics.login = async function (mail,password){
  if(!mail || !password){
    throw Error ("All fields must be filled")
  }
  const user = await this.findOne({mail})
  if(!user){
    throw Error ("Incorrect Email")
  }
  const match = await bcrypt.compare(password,user.password)
  if(!match){
    throw Error ("Incorrect Password")
  }
  return user
}

module.exports= mongoose.model("User", userSchema);

