const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const dbConnect = () => {
    try {
        mongoose.connect(mongoURI).then(()=>{
            console.log('database connected successfully');
        }).catch((error)=>{
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;