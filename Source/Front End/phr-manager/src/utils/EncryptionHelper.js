export function generateSharedKey(){
     return "SharedKey";
}
export function encrypt(plainText, key){
     return "The encrypted file";
}

export function decrypt(encryptedText, key){
     return "The plain file";
}

export function generatePubKey(privteKey){
    return "public key";
}

export function generatePubPrivateKeys(){
    return  {
        publicKey: '0xpublicKey',
        privateKey: '0xprivateKey',
    };
}