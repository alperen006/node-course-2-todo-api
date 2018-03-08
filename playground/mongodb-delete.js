const MongoClient = require('mongodb').MongoClient;
// Bunun birebir aynı işlevi gören ES6 ile gelen destructuring ile:   const {MongoClient} = require('mongodb');  dir.
const ObjectId = require('mongodb').ObjectId;   // birebir aynısı >>        const {ObjectId} = require('mongodb');

// Database Name
const dbName = 'TodoApp';

// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected successfully to MongoDB server");
  const db = client.db(dbName);

  // fonksiyonlara şu adresten ulaşabilirsin >>   http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#deleteOne

  //deleteMany = Delete multiple documents on MongoDB
  db.collection('Todos').deleteMany({"text" : "Eat lunch"}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete document by Promise', err);
  });      /*   >> PROMİSE İLE YAPILMIŞ HALİ  */

  db.collection('Todos').deleteMany({"text" : "Eat lunch"}, undefined, (err, res) => {
    console.log(res);
    console.log(err);
  });                /*     >> CALLBACK İLE YAPILMIŞ HALİ   */


  //deleteOne = Delete a document on MongoDB  (koşula, filtreye uyan ilk document'i siler.)
  db.collection('Todos').deleteOne({"text" : "Walk the dog"}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete document by Promise', err);
  });

  //findOneAndDelete = Find a document and delete it in one atomic operation, requires a write lock for the duration of the operation.
  db.collection('Todos').findOneAndDelete({"text" : "Walk the dog"}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete document by Promise', err);
  });

  db.collection('Todos').findOneAndDelete({"_id" : ObjectId("5aa17209d6a39e76290bee4f")}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete document by Promise', err);
  });

  client.close(); // disconnect from the database server.
});




/* ES6 ile gelen destructuring özelliği örnek;

var user = { name: 'Alperen', age: 24 };
var {name} = user;
console.log(name);    // bunun sonucunda ekrana 'Alperen' yazısı basılacaktır. Buna destructuring deniyor.   */
