const mongoose = require('mongoose');

const brandsSchema = mongoose.Schema({
    label : {type: String, required: true, unique: true},
    value : {type: String, required: true, unique: true},
})

const virtual = brandsSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

brandsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});



const Brands = mongoose.model("Brands", brandsSchema);

module.exports = Brands;