const express = require("express");
const { auth } = require("../middleware/auth");
const facebookRoutes = express.Router();

facebookRoutes.post('/send-friend-request', auth(['user']), )
facebookRoutes.get('/friend-list', auth(['user']), )
facebookRoutes.post('/friend-request/:id', auth(['user']), )
facebookRoutes.post('/send-friend-request', auth(['user']), )


module.exports = facebookRoutes;