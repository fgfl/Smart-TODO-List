// load .env data into process.env
require('dotenv').config();

const request = require('request-promise');

const {JSDOM} = require('jsdom');
const {window} = new JSDOM(`...`);

var $ = require("jquery")(window);

const fetchCategory = (text) => {
  const deepCatEndpoint = 'https://api.meaningcloud.com/deepcategorization-1.0';
  const options = {
    key: process.env.DB_MEANINGCLOUD_KEY,
    txt: text,
    model: 'IAB_2.0_en',
  };

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.meaningcloud.com/deepcategorization-1.0",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "key": process.env.DB_MEANINGCLOUD_KEY,
      "txt": text,
      "model": "IAB_2.0_en"
    }
}

  console.log($.param(options));

  $.ajax(settings).done(function (response) {
    console.log(JSON.stringify(response.category_list));
  });
  // $.post(deepCatEndpoint, $.param(options))
  //   .then((res) => {
  //     console.table(res);
  //   })
  //   .catch((err) => {
  //     console.error('error', err);
  //   });

};

fetchCategory("Harry Potter");
