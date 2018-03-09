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

  // findOneAndUpdate(filter, update, options, callback) >> Find a document and update it in one atomic operation.
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectId('5aa2747cdd24e95d2890d492')
  }, {
    $set: {
      "completed": true,
      "text": "Lunch was over."
    }                                   // "MongoDB update operators" google'a aratabilirsin. https://docs.mongodb.com/manual/reference/operator/update/
  }, {
    returnOriginal: false
  }).then((result) => {     // promise ile yapıldı....
    console.log("\n\nUpdate by Promise");
    console.log(result);
  });


  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectId('5aa2747cdd24e95d2890d492')
  }, {
    $set: {
      "completed": false,
      "text": "Lunch was not over."
    }                                   // "MongoDB update operators" google'a aratabilirsin. https://docs.mongodb.com/manual/reference/operator/update/
  }, {
    returnOriginal: false
  }, (err, result) => {
    console.log("\n\nUpdate by Callback");
    console.log(err);
    console.log(result);
  });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId('5aa0364eaec47d225c4584cf')
  }, {
    $inc: {
      age: -2,
      "weight": 4        // yaşı 2 azaltıp kiloyu 4 arttırdım..
    },
    $set: {
      name: "Ömer Tatlıtuğ"      // ismide ömer olarak değiştirelim.
    }
  }, {
    returnOriginal: false
  }).then((result) => {     // promise ile yapıldı....
    console.log("\n\nUpdate by Promise");
    console.log(result);
  });


  client.close(); // disconnect from the database server.
});




/* ES6 ile gelen destructuring özelliği örnek;

var user = { name: 'Alperen', age: 24 };
var {name} = user;
console.log(name);    // bunun sonucunda ekrana 'Alperen' yazısı basılacaktır. Buna destructuring deniyor.   */
