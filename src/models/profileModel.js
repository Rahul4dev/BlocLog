import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide full description'],
  },
  username: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
  },
  website: {
    type: String,
    required: [true, 'Please provide your website url'],
  },
  location: {
    type: String,
    required: [true, 'Please provide your location'],
  },
  image: {
    type: String,
    required: [true, 'Please provide image url'],
  },
  role: {
    type: String,
    required: [true, 'Please provide your role'],
  },
  id: {
    type: String,
    required: [true, 'Please provide your ID'],
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

const Profile =
  mongoose.models.profile || mongoose.model('profiles', profileSchema);

export default Profile;
