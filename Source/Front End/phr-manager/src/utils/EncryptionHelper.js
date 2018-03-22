const CryptoJS = require("crypto-js");
const bs58 = require('bs58');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const crypto = require("crypto");
const eccrypto = require("eccrypto");


function convertArrayBuffer2WordArray(arraybuffer) {
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

function hexToBase58(stringHex) {
    const bytes = Buffer.from(stringHex, 'hex')
    return bs58.encode(bytes);
}

function base58ToHex(stringBase58) {
    const bytes = bs58.decode(stringBase58)
    return bytes.toString('hex');
}

function ecKeyToBase58KeyPair(keyPair){
    const publicKeyHex = keyPair.getPublic('hex').toString();
    const privateKeyHex = keyPair.getPrivate('hex').toString();
    const publicKeyBase58 = hexToBase58(publicKeyHex);
    const privateKeyBase58 = hexToBase58(privateKeyHex);

    return  {
        publicKey: publicKeyBase58,
        privateKey:privateKeyBase58
    };
}

export function generateSharedKey(){
    return crypto.randomBytes(32);
    //  return "TODO";
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

function keyBase58ToECKey(publicKeyBase58, privateKeyBase58){
    if (publicKeyBase58){
        const publicKeyHex = base58ToHex(publicKeyBase58);
        return ec.keyFromPublic(publicKeyHex, 'hex');
    } else if (privateKeyBase58) {
        const privateKeyHex = base58ToHex(privateKeyBase58);
        return ec.keyFromPrivate(privateKeyHex);
    }
}

export function extractPubKey(privateKeyBase58){
    const ecKey = keyBase58ToECKey(null, privateKeyBase58);
    return ecKeyToBase58KeyPair(ecKey).publicKey;
}

export function generatePubPrivateKeys(){
    const ecKey = ec.genKeyPair();
    return ecKeyToBase58KeyPair(ecKey);
}

export function encryptByPublicKeyAsync(publicKeyBase58, message){
    const ecKey = keyBase58ToECKey(publicKeyBase58, null);
    eccrypto.encrypt()
}

export function decryptByPublicKeyAsync(privateKeyBase58, message){
    
}
export function test(){
    var k1 = generatePubPrivateKeys();
    var k2 = generatePubPrivateKeys();
    var a = keyBase58ToECKey(k1.publicKey, null);
    var b = keyBase58ToECKey(null, k2.privateKey);
    var A = a.getPublic('ar');
    var B = b.getPrivate('ar');
var msg = {
    "name": "phr-manager",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "antd": "^3.3.1",
      "bs58": "^4.0.1",
      "crypto-js": "^3.1.9-1",
      "eslint": "^4.19.0",
      "ipfs-api": "^18.2.0",
      "react": "^16.2.0",
      "react-dom": "^16.2.0",
      "react-scripts": "1.1.1",
      "save-as": "^0.1.8",
      "web3": "^0.20.6"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    }
  };
  var json = JSON.stringify(msg);
  
eccrypto.encrypt(A, Buffer(json)).then(function(encrypted) {
    // B decrypting the message.
    eccrypto.decrypt(B, encrypted).then(function(plaintext) {
        console.log("Message to part B:", plaintext.toString());
        debugger
    });
  });
  debugger
  return {
    publicKey: A,
    privateKey: B
  };
}

export function decrypt(encryptedText, encryptedSymetricKey, privateKey){
    /**TODO
     * Decrypt symetric key using private key
     * Decrypt text using symetric key
     */
    return encryptedText;
}