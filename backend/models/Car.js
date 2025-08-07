import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  fuel_type: {
    type: String,
    required: true
  },
  seating_capacity: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String, // This can be a URL or a file path
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
},{timestamps:true});

const Car = mongoose.model('Car', carSchema);

export default Car;
