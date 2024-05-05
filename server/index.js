const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes');

// const seedProducts = require('./db/seeds');

// seedProducts is a fake dabase 

const app = express();
const defaultURI = ''; //your mongodb url or local mongodb
const uri = defaultURI;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/', adminRoutes);
app.use(cors())

connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(5000, () => console.log("Server is running on port 5000"));
  })
  .catch(e => {
    console.error('MongoDB connection error:', e);
  });
