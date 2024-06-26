const express = require('express');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const facebookRoutes = require('./routes/facebookRoutes');
const router = express.Router();

router.use('/user', userRoutes)
router.use('/category', categoryRoutes);
// router.use('/facebook', facebookRoutes);

module.exports = router