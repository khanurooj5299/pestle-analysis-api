const connection = require('./connection');
const fs = require('fs');

connection.connect.then(()=>{
    //connection to db successfull

    //get article model
    const ArticleModel = require('../models/article.model');

    //checking if db is already seeded
    ArticleModel.estimatedDocumentCount().then(count=>{
        if(count > 0) {
            console.log('DB already seeded');
            connection.disconnect();
        } else {
            //Seed the DB
            fs.readFile(__dirname+'/../assets/jsondata.json', (err, data)=>{
                if(err) {
                    console.log('error reading json file: '+ err);
                    connection.disconnect();
                } else {
                    const articles = JSON.parse(data);
                    ArticleModel.insertMany(articles).then(result => {
                        if(result.length > 0) {
                            console.log("Seeding successful");
                        } else {
                            console.log("Seeding unsuccessful. One or more documents do not conform to schema");
                        }
                    }).finally(() => connection.disconnect());;
                }
            });
        }
    }).catch(err=>{
        console.log('error couting documents : '+err);
        connection.disconnect();
    });
}).catch(()=>{
    console.log("Seeding database failed!");
});