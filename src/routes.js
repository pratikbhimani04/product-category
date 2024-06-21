const express = require('express');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const router = express.Router();

router.use('/user', userRoutes)
router.use('/category', categoryRoutes);

module.exports = router