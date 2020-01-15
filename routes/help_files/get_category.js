// load .env data into process.env
require('dotenv').config();

const request = require('request-promise');

const {
  JSDOM
} = require('jsdom');
const {
  window
} = new JSDOM(`...`);

const $ = require("jquery")(window);

const fetchCategory = (text) => {
  const username = 'Frederick';
  const classifierName = 'TEST';

  const options = {
    'method': 'POST',
    'uri': `https://api.uclassify.com/v1/${username}/${classifierName}/classify`,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Token ${process.env.DB_UCLASSIFY_READ_KEY}`,
    },
    'body': {
      'texts': [text],
    },
    'json': true,
  };

  request(options)
    .then((res) => {
      console.log(JSON.stringify(res));
    })
    .catch((err) => {
      console.error('request call failed.', err);
    });

  // ----- meaning cloud stuff -----
  // const deepCatEndpoint = 'https://api.meaningcloud.com/deepcategorization-1.0';
  // const options = {
  //   key: process.env.DB_MEANINGCLOUD_KEY,
  //   txt: text,
  //   model: 'IAB_2.0_en',
  // };

  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.meaningcloud.com/deepcategorization-1.0",
  //   "method": "POST",
  //   "headers": {
  //     "content-type": "application/x-www-form-urlencoded"
  //   },
  //   "data": {
  //     "key": process.env.DB_MEANINGCLOUD_KEY,
  //     "txt": text,
  //     "model": "IAB_2.0_en"
  //   }
  // }

  // console.log($.param(options));

  // $.ajax(settings).done(function (response) {
  //   console.log(JSON.stringify(response.category_list));
  // });


};

module.exports = {
  fetchCategory
};
