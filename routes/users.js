
 const mongoose = require("mongoose");
 const plm = require('passport-local-mongoose');
 mongoose.connect("mongodb://localhost/login_authenticationdb");

 const userSchema = mongoose.Schema({
   name:String,
   username:{
     type:String,
     unique:true
   },
   password:String,
   email:{
    type:String,
    unique:true
  },
   fullname:String,
   secretname:String
 });

 userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);

