
 const MongoClient = require('mongodb').MongoClient;
 const uri = "mongodb+srv://hiteshAdmin:DnNYj5WtBtCdNiF@cluster0.wlde3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const sendLikedSong = async (song_artist, song_title, song_img_url, decrypted_mp3_url, login, password, callback) => {
   
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('fmusic');
    await db.collection('main-c').insertOne({song_artist, song_img_url, song_title, decrypted_mp3_url, login, password});
    client.close();
    callback();
}

const getLikedSongsList = async (login,password, callback) => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('fmusic');
   const data =  await db.collection('main-c').find({login, password}).toArray();
    callback(data);
}

const validUserPassword = async (login, password, callback) => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('fmusic');
    const user =  await db.collection('main-c').findOne({login});
    const user_password = await db.collection('main-c').findOne({login, password});
    if(user !== null && user_password === null) {
        callback('wrong_pass');
    }
    else if (user === null) {
        callback('user_not_exist')
    }
    else if (user !== null && user_password === null) {
        callback('youre_in');
    }

}


module.exports = {sendLikedSong, getLikedSongsList, validUserPassword}



