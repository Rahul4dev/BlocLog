import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name of the Product'],
    unique: true,
  },
  brand: {
    type: String,
    required: [true, 'Please provide Brand of the Product'],
  },
  addedBy: {
    type: String,
    required: [true, 'Please provide Name of the Person Adding the Product'],
  },
  serialKey: {
    type: String,
    required: [
      true,
      'Please provide Serial Key of the Person Adding the Product',
    ],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: Date,
});

const Product =
  mongoose.models.product || mongoose.model('products', productSchema);

export default Product;
