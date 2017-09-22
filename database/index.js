const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type: Number, unique: true },
  name: String,
  owner: String,
  description: String,
  repo_size: Number,
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
        // console.log('Added repo with options', options);
        resolve();
      }
    });
  });
};

let getTop25 = function(query = 'updated_at') {
  return new Promise ((resolve, reject) => {
    find ({}, (data) => {
      data.sort(function(a, b) {
        var keyA = new Date(a.updated_at),
            keyB = new Date(b.updated_at);
        // Compare the 2 dates
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
      });
      console.log('getTopData:', data);
      // Have an array of all of them
      resolve(data.splice(0, 25));
    }).catch((err) => {
      reject(err);
    });
  });
}

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

let reformat = (rawData) => {
  var result = [];
  for (var repo of rawData) {
    // console.log('Processing repo:',repo);
    var newRepo = {};
    newRepo.repo_id = repo.id;
    newRepo.name = repo.name;
    newRepo.owner = repo.owner.login;
    newRepo.description = repo.description;
    newRepo.repo_size = repo.size;
    newRepo.created_at = repo.created_at;
    newRepo.updated_at = repo.updated_at;
    newRepo.url = repo.html_url;
    result.push(newRepo);
  }
  return result;
}

//For app testing purposes
let cleanDatabase = () => {
  return new Promise ((resolve, reject) => {
    Repo.remove({}, () => {
      console.log('Cleaned database');
      resolve();
    });
  });
};

let saveMultiple = (array) => {
  return new Promise ((resolve, reject) => {
    let i = 0;
    let loop = function() {
      if (i >= array.length) {
        return;
      } else {
        save(array[i])
        .then(() => {
          i++;
          loop();
        })
        .catch((err) => {
          reject(err);
        });
      }
    }
    loop();
    resolve('success');
  });
}

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
module.exports.saveMultiple = saveMultiple;
module.exports.cleanDatabase = cleanDatabase;
module.exports.reformat = reformat;
module.exports.getTop25 = getTop25;
