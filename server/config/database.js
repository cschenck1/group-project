const mongoose = require('mongoose');
const dbUri = process.env.MONGODB_URI || process.env.DB_URI;

function dbConfig() {
    mongoose.connect(dbUri, { useNewUrlParser: true });
    mongoose.Promise = require('bluebird');

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {  
        console.log('Mongoose default connection open to ' + dbUri);
    }); 

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {  
        console.log('Mongoose default connection error: ' + err);
    }); 

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {  
        console.log('Mongoose default connection disconnected'); 
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {  
        mongoose.connection.close(function() { 
            console.log('Mongoose default connection disconnected through app termination'); 
            process.exit(0); 
        }); 
    });
}

module.exports = dbConfig;