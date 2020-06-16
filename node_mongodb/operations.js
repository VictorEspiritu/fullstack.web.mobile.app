
exports.insertDocument = (db, doc, collection) => {

    const coll = db.collection(collection);
    return coll.insertOne(doc);
};

exports.findDocuments = (db, collection) => {
    
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.updateDocument = (db, doc, update, collection) => {  

    const coll = db.collection(collection);
    return coll.updateOne(doc, { $set: update }, null);
};

exports.removeDocument = (db, doc, collection) => {  

    const coll = db.collection(collection);
    return coll.deleteOne(doc);
};

