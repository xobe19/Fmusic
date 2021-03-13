const ep = require('./endpoints');
const request = require('request');


const getParticularAlbumDetails = (albumID, callback) => {
   const url = ep.album_details_base_url + albumID;
   request(url, (error, response) => {
      let data = JSON.parse(response.body).songs;
      data.forEach(song => {
         song.image = song.image.replace('50x50.jpg', '250x250.jpg')
     });
     callback(error, data);
   })
}

module.exports = getParticularAlbumDetails;