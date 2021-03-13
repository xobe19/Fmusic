const ep = require('./endpoints');
const request = require('request');

const searchSong =  (searchString, callback) => {
request(ep.search_base_url + searchString, (error, response) => {
const data = JSON.parse(response.body).songs.data;
data.forEach(song => {
    song.image = song.image.replace('50x50.jpg', '250x250.jpg')
});
// console.log(data);
// let songIDs = []
// let songTitles = []
// let songImages = []
// let songArtists = []
// data.forEach(song => {
//     songIDs.push(song.id);
//     songImages.push(song.image);
//     songTitles.push(song.title);
//     songArtists.push(song.more_info.singers);
// });
// console.log(songIDs, songTitles, songImages, songArtists);
callback(error, data);
})
}
const searchAlbum =  (searchString, callback) => {
    request(ep.search_base_url + searchString, (error, response) => {
    const data = JSON.parse(response.body).albums.data;
    data.forEach(song => {
        song.image = song.image.replace('50x50.jpg', '250x250.jpg')
    });
    callback(error, data);
    })
    }

 
    


const searchPlaylist = (searchString, callback) => {
request(ep.search_base_url + searchString, (error, response) => {
const data = JSON.parse(response.body).playlists.data;

callback(error, data);
})
}


module.exports = {searchAlbum, searchSong, searchPlaylist}