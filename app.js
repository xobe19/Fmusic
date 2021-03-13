const express = require('express')
const path = require('path')
var app = express();
const sf = require('./searchFunctions');
const rs = require('./retreiveSong');
const ad = require('./albumDetails');
const dc = require('./decryptor');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')



app.get('/', (request, response) => {
    response.render('index');
})
app.get('/search', (request, response) => {
    response.redirect('/search/songs');
})
app.get('/search/songs', (request, response) => {
    let requestedData = request.query;
    console.log(requestedData)

    sf.searchSong(requestedData.query, (error, data) => {
       let pidArray =[] ;
       data.forEach((element) => {
           pidArray.push(element.id);
       });
       rs(pidArray, (error, pidresult) => {
          for(let i = 0; i < pidresult.length; i++) {
              data[i].decrypted = pidresult[i];
          }
          response.render('songSearch', {data});
       })
       
    })
    
})

app.get('/search/albums', (request, response) => {
    let requestedData = request.query;
    sf.searchAlbum(requestedData.query, (error, data) => {
        response.render('albumSearch', {data});
    })
   
})

app.get('/search/albums/album', (request, response) => {
    let requestedData = request.query;
    console.log(requestedData)

    ad(requestedData.query, (error, data) => {
       let decrypted_urls = [];
       data.forEach((song) => {
           song.decrypted = dc(song.encrypted_media_url)
       });
       response.render('singleAlbum', {data});
       
       
    })
})



// app.get('/search/songs', (req, res) => {
//     res.render('songSearch')
// })

app.listen(3000)
