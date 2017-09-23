const request = require('request');
const config = require('../config.js');

let getReposByUsername = (query) => {
  let options = {
    url: `https://api.github.com/users/${query}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  console.log('Making request to github with query', query);
  return new Promise ((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        throw err;
        reject(err);
      } else {
        if (body.message) {
          reject(body.message);
        }
        resolve(body);
      }
    });
  });
}

module.exports.getReposByUsername = getReposByUsername;
