const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title : {type: String, required: true, unique: true},
    description : {type: String, required: true},
    price: {type: Number, required: true, min: [1, 'wrong Price'] },
    discountPercentage: {type: Number, min: [1, 'wrong Min Percentage'], max: [100, 'Wrong MaxPercentage'] },
    stock: {type: Number, min: [0, 'wrong Min Percentage'], max: [1000, 'Wrong MaxPercentage'] },
    rating: {type: Number, min: [0, 'wrong Min Percentage'], max: [100, 'Wrong MaxPercentage'], default: 0 },
    category : {type: String, required: true},
    brand: {type: String, required: true},
    thumbnail: {type: String, required: true},
    images: {type: [String], required: true},
    deleted: {type: Boolean, default: false}
})

const virtual = productSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});



const Product = mongoose.model("Products", productSchema);

module.exports = Product;