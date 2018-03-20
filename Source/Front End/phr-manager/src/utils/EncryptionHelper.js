var CryptoJS = require("crypto-js");

export function generateSharedKey(){
     return "TODO";
}
export function encrypt(plainText, symmetricKey){
    var encrypted  =  CryptoJS.AES.encrypt(plainText, symmetricKey);
    return encrypted.toString();
}

export function decrypt(encryptedText, symmetricKey){
    var decrypted = CryptoJS.AES.decrypt(encryptedText, symmetricKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
}