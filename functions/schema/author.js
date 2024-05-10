const mongoose = require('mongoose');
const {Schema} = mongoose;

const authorSchema = new Schema({
  name:{
    type:String,
  },
  age:{
    type:Number,
  },
  username:String,
  password:String,
  films: [{ // Array of films
    title: String,
    releaseDate: Date
    // Add more film-related fields as needed
  }]

});

authorSchema.pre('save',function(next){
  const username = this.name.toLowerCase().replace(/\s/g,'');
  const password = `${this.name}${this.age}`;
  this.username = username;
  this.password = password;
  next();
});

module.exports = authorSchema;