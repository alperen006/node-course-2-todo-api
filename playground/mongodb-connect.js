const MongoClient = require('mongodb').MongoClient;
// Bunun birebir aynı işlevi gören ES6 ile gelen destructuring ile:   const {MongoClient} = require('mongodb');  dir.

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

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if(err){
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.collection('Users').insertOne({
    name: 'Alperen Tuzun',
    age: 24,
    location: 'Ankara'
  }, (err, result) => {
    if(err){
      return console.log('Unable to insert user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  client.close(); // disconnect from the database server.
});




/* ES6 ile gelen destructuring özelliği örnek;

var user = { name: 'Alperen', age: 24 };
var {name} = user;
console.log(name);    // bunun sonucunda ekrana 'Alperen' yazısı basılacaktır. Buna destructuring deniyor.   */
