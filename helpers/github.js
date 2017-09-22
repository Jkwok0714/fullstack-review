const request = require('request');
const config = require('../config.js');

let getReposByUsername = (query) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
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
        // console.log('Got a request response', body);
      }
    });
  });

  //GET https://api.github.com//users/:username/repos
}

module.exports.getReposByUsername = getReposByUsername;
