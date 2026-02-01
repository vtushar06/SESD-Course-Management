import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/course-management';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Start server
    app.listen(PORT, () => {
      console.log(`Course Management Backend Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server error:', error);
    process.exit(1);
  }
};

startServer();
