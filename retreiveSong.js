const ep = require('./endpoints');
const request = require('request');
const dc = require('./decryptor')
const retr = (pidArray, callback) => {
    let completed_reqs = [];
    let completed_reqs_number = 0;
for(let i = 0; i < pidArray.length; i++) {
    let pid = pidArray[i];

    request(ep.song_details_base_url + pid, (error, response) => {
        const data = JSON.parse(response.body);
        const encrypted_media_url = data[pid].encrypted_media_url;
       completed_reqs[i] = (dc(encrypted_media_url));
       completed_reqs_number++;
       if(completed_reqs_number === pidArray.length) {
           console.log('done yo')
           callback(error, completed_reqs);
         
       }
    })


}

}

module.exports = retr;