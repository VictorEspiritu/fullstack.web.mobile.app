const MongoClient   = require('mongodb').MongoClient;
const assert        = require('assert');
const dbOper        = require('./operations');

const url   = 'mongodb://172.17.0.2:27017/';
const dbname= 'conFusion';
const collectionName = 'dishes';

MongoClient.connect(url)
.then((client) => {

    console.log('Connected correctly to server');        
    const db = client.db(dbname);

    dbOper.insertDocument(db, { name: 'Arroz con Pollo', description: 'The best peruvian food'}, collectionName)
    .then((result) => {

        console.log('Insert Document: ', result.ops);
        return dbOper.findDocuments(db, collectionName);
    })
    .then((docs) => {

        console.log('Found Documents: ', docs);
        return dbOper.updateDocument(db, {name: 'Arroz con Pollo'}, { description: 'Update description' }, collectionName);
    })
    .then((result) => {

        console.log('Update Documents: ', result.result);
        return dbOper.findDocuments(db, collectionName);
    })
    .then((docs) => {
        
        console.log('Found Documents: ', docs);
        return db.dropCollection(collectionName);
    })
    .then((result) => {
         
        console.log('Dropped Collection ', result);
        client.close();    
    })  
    .catch((err) => console.log('ERROR OPERATIONS: ', err));

})
.catch((err) => console.log('ERROR CONNECT: ', err));



