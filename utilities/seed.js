require("dotenv").config({ path: __dirname + "/../.env" });
const connection = require("./connection");
const fs = require("fs");

connection.connect
  .then(() => {
    //connection to db successfull

    //get observation model
    const ObservationModel = require("../models/observation.model");

    //checking if db is already seeded
    ObservationModel.estimatedDocumentCount()
      .then((count) => {
        if (count > 0) {
          console.log("DB already seeded");
          connection.disconnect();
        } else {
          //Seed the DB
          fs.readFile(
            __dirname + "/../assets/pestle-analysis.json",
            (err, data) => {
              if (err) {
                console.log("error reading json file: " + err);
                connection.disconnect();
              } else {
                const observations = JSON.parse(data);
                ObservationModel.insertMany(observations)
                  .then((result) => {
                    if (result.length > 0) {
                      console.log("Seeding successful");
                    } else {
                      console.log(
                        "Seeding unsuccessful. One or more documents do not conform to schema"
                      );
                    }
                  })
                  .finally(() => connection.disconnect());
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log("error couting documents : " + err);
        connection.disconnect();
      });
  })
  .catch((err) => {
    console.log("Seeding database failed!");
    console.log(err);
  });
