const connection = require('./connection');

connection.connect.then(()=>{

}).catch(()=>{
    console.log("Seeding database failed!");
});