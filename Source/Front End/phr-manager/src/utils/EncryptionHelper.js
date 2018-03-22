const CryptoJS = require("crypto-js");
const bs58 = require('bs58');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

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

function toBase58KeyPair(keyPair){
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

export function extractPubKey(privteKeyBase58){
    const privateKeyHex = base58ToHex(privteKeyBase58);
    const keyPair = ec.keyFromPrivate(privateKeyHex);
    return toBase58KeyPair(keyPair).publicKey;
}

export function generatePubPrivateKeys(){
    const keyPair = ec.genKeyPair();
    return toBase58KeyPair(keyPair);
}

export function decrypt(encryptedText, encryptedSymetricKey, privateKey){
    /**TODO
     * Decrypt symetric key using private key
     * Decrypt text using symetric key
     */
    return encryptedText;
}