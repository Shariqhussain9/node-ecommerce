const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role: {type: String, required: true, default: 'user'},
    addresses: {type: mongoose.Schema.Types.Mixed , default: []},
    name: {type: String},
    orders: {type: mongoose.Schema.Types.Mixed }
    
})

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});



const Users = mongoose.model("Users", userSchema);

module.exports = Users;