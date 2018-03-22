const CryptoJS = require("crypto-js");
const crypto = require('crypto');
const ecies = require('standard-ecies');

function convertArrayBuffer2WordArray(arraybuffer)
{
    var words = [],
    u8arr = new Uint8Array(arraybuffer),
    len = u8arr.length;
    console.log("length = " + len);
    for (var i = 0; i < len; i++) {
        words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
    }
    return CryptoJS.lib.WordArray.create(words, len);
}

function convertWordArrayToUint8Array(wordArray) {
	var len = wordArray.words.length,
		u8_array = new Uint8Array(len << 2),
		offset = 0, word, i;
    
	for (i=0; i<len; i++) {
		word = wordArray.words[i];
		u8_array[offset++] = word >> 24;
		u8_array[offset++] = (word >> 16) & 0xff;
		u8_array[offset++] = (word >> 8) & 0xff;
		u8_array[offset++] = word & 0xff;
	}
	return u8_array;
}

export function generateSharedKey(){
     return "TODO";
}
export function encrypt(arrayBuffer, symmetricKey){
    var wordArray = convertArrayBuffer2WordArray(arrayBuffer);
    var encryptionResult = CryptoJS.AES.encrypt(wordArray, symmetricKey);
    var encryptedText = encryptionResult.toString();
    return encryptedText;
}

export function decryptAsWordArray(encryptedText, symmetricKey){
    var wordArray = CryptoJS.AES.decrypt(encryptedText, symmetricKey);
    return wordArray;
}

export function decryptAsByteArray(encryptedText, symmetricKey){
    var wordArray = decryptAsWordArray(encryptedText, symmetricKey);
    var bytearray = convertWordArrayToUint8Array(wordArray);
    return bytearray;
}

export function decryptAsString(encryptedText, symmetricKey){
    var wordArray = decryptAsWordArray(encryptedText, symmetricKey);
    var str = wordArray.toString();
    return str;
}

const curveName = 'secp256k1';

export function extractPubKey(privteKeyHex){
    // console.log(privteKeyHex);
    // var ecdh = crypto.createECDH(curveName);
    // // ecdh.generateKeys();
    // debugger
    // ecdh.setPrivateKey(privteKeyHex, 'hex');

    // return ecdh.getPublicKey('hex').toString();
    return "public";
}

export function generatePubPrivateKeys(){
    var ecdh = crypto.createECDH(curveName);
    ecdh.generateKeys();

    return  {
        publicKey: ecdh.getPublicKey('hex').toString(),
        privateKey: ecdh.getPrivateKey('hex').toString(),
    };
}

export function decrypt(encryptedText, encryptedSymetricKey, privateKey){
    /**TODO
     * Decrypt symetric key using private key
     * Decrypt text using symetric key
     */
    return encryptedText;
}