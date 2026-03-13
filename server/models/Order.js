import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],

  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  paymentResult: {
    id: String,
    status: String,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  paidAt: Date,

  isDelivered: {
    type: Boolean,
    default: false,
  },

  deliveredAt: Date,
},
{
  timestamps: true,
}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;