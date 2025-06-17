const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/noteRoutes')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/notes',noteRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

app.listen(3000, () => {
  console.log(`🚀 Server running at http://localhost:3000`);
});
