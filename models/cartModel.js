const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    quantity: {type: Number, required: true, default: 1},
    product: {type: mongoose.Schema.ObjectId , ref: 'Products', required: true},
    user: {type: mongoose.Schema.ObjectId , ref: 'Users', required: true}

})

const virtual = cartSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

cartSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});



const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;