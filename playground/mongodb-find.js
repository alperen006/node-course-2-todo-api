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

// toArray methodu http://mongodb.github.io/node-mongodb-native/3.0/api/ burada "Cursor" kategorisinin altında bulabilirsin..

// toArray promise yapısını kullandık bknz: 008_weather-app/playground/promise.js
  db.collection('Todos').find().toArray().then((docs) => {
    console.log('\nTodos Promise');
    console.log(docs);  // JSON.stringify(docs, undefined, 2); diyerek te ekrana yazdırabilirsin..
  }, (err) => {
    console.log('Unable to fetch todos by Promise', err);
  });

// ikinci yöntem promise olmadan callback methoduyla çalıştırma..
  db.collection('Todos').find().toArray( (err, docs) => {
    if (err) {
      return console.log('Unable to fetch todos by Callback', err);
    }
    console.log('\nTodos Callback');
    console.log(docs);
  });

  //  text field'i içerisinde "dog" kelimesi geçen document'leri fetch etme sorgusu..
  db.collection('Todos').find({"text" : {$regex : ".*dog.*"}}).toArray( (err, docs) => {
    if (err) {
      return console.log('Unable to fetch todos by Callback', err);
    }
    console.log('\nA todos document that includes "dog"');
    console.log(docs);
  });

// CALLBACK FONKSİYON İLE COUNT METHODU
  db.collection('Todos').find({"text" : {$regex : ".*dog.*"}}).count( (err, count) => {
    if (err) {
      return console.log('Unable to fetch todos by Callback', err);
    }
    console.log(`\n(by Callback) Total number of documents containing "dog" in Todos: ${count}`);
  });

// PROMISE İLE COUNT METHODU
  db.collection('Todos').find({"text" : {$regex : ".*dog.*"}}).count().then((count) => {
    console.log(`\n(by Promise) Total number of documents containing "dog" in Todos: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos by Promise', err);
  });


  client.close(); // disconnect from the database server.
});




/* ES6 ile gelen destructuring özelliği örnek;

var user = { name: 'Alperen', age: 24 };
var {name} = user;
console.log(name);    // bunun sonucunda ekrana 'Alperen' yazısı basılacaktır. Buna destructuring deniyor.   */
