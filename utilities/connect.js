const mongoose = require('mongoose');

//connectionPromise is a promise which resolves with undefined when the connection is successful and rejects with the mongodb error, when it is not
const connectionPromise = mongoose.connect(process.env.MONGO_URI | 27017).then(()=>{
    console.log('Connection to DB created succesfully.');
}).catch(err=>{
    console.log('Connection to DB failed!');
    console.error(err);
    throw err;
});

module.exports = connectionPromise;