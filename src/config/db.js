// src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not set. Please add it to your environment variables.');
    }

    console.log('[v0] Attempting to connect to MongoDB...');
    console.log('[v0] MONGO_URI:', mongoUri.substring(0, 50) + '...');
    
    await mongoose.connect(mongoUri, {
      retryWrites: true,
      w: 'majority',
    });
    
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
