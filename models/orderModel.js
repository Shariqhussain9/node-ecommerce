const mongoose = require('mongoose');
const {Schema} = mongoose;



const orderSchema = mongoose.Schema({
    items: [{type: [Schema.Types.Mixed], required: true}],
    totalItems: {type: Number },
    totalAmount: {type: Number },
    user: {type: mongoose.Schema.ObjectId, ref: 'Users', required: true},
    paymentMethod: {type: String, required: true},
    status: {type: String, default: 'pending'},
    selectedAddress: {type: mongoose.Schema.Types.Mixed, required: true}
});

const virtual = orderSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});



const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;