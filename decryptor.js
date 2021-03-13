

const decryptor = (encrypted) => {

    const crypto = require('crypto');
    const algorithm = 'des-ecb';
    const key = Buffer.from("3338333436353931", "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, null);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;


}
module.exports = decryptor