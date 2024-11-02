import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  lease: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    monthlyRent: { type: Number, required: true },
    terms: { type: String, trim: true }
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Due', 'Overdue'], // Optional: restrict values to specific statuses
    default: 'Due' // Set a default status if desired
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;
