const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Double,
  name: String,
  owner: String,
  description: String,
  created_at: String,
  updated_at: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (options) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var model = new Repo(options);
  return new Promise ((resolve, reject) => {
    model.save((err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log('Added repo with options', options);
        resolve();
      }
    });
  });
};

let find = (query, callback) => {
  return new Promise ((resolve, reject) => {
    Repo.find(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        callback(data);
        resolve(data);
      }
    })
  });
};

//For app testing purposes
let cleanDatabase = () => {
  return new Promise ((resolve, reject) => {
    Repo.remove({}, () => {
      console.log('Cleaned database');
      resolve();
    });
  });
};

/* Test */
// save({ name: 'Fake Repo Again', owner: 'Nobody' })
// .then(() => {
//   find({ name: /^Fake/ }, (data) => {
//     console.log(data);
//   });
// })

// find ({}, (data) => {
//   console.log(data);
// }).then(() => {
//   return cleanDatabase();
// })
// .then(() => {
//   find ({}, (data) => {
//     console.log(data);
//   });
// });

module.exports.save = save;
module.exports.find = find;
module.exports.cleanDatabase = cleanDatabase;
