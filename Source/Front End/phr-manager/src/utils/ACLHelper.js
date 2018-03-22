

function validateACLStructure(aclJson) {
    if (!aclJson.hasOwnProperty('acl')) {
        aclJson.acl = {};
    }
    if (!aclJson.acl.hasOwnProperty('publicAddress')) {
        aclJson.acl.publicAddress = '';
    }
    if (!aclJson.acl.hasOwnProperty('files')) {
        aclJson.acl.files = [];
    }
    if (!aclJson.acl.hasOwnProperty('shares')) {
        aclJson.acl.shares = {};
    }
}
export function addFileAccess(aclJson, myPubAddress, fileAddress, encryptedsharedkey, encryptedFileName) {

    validateACLStructure(aclJson);

    aclJson.acl.publicAddress = myPubAddress;
    aclJson.acl.files.push({
        'fileAddress': fileAddress,
        'encryptedSymmetricKey': encryptedsharedkey,
        'encryptedFileName': encryptedFileName,
    })
}



export function shareFile(aclJson, recieverPubKey, fileAddress, encryptedsharedkey, encryptedFileName) {
    validateACLStructure(aclJson);

    if (!aclJson.acl.shares.hasOwnProperty(recieverPubKey)) {
        aclJson.acl.shares[recieverPubKey] = [];
    }

    aclJson.acl.shares[recieverPubKey].push({
        'fileAddress': fileAddress,
        'encryptedSymmetricKey': encryptedsharedkey,
        'encryptedFileName': encryptedFileName,
    })
}

export function getMyFileAccess(aclJson, fileAddress) {
    var files = aclJson.acl.files;
    if (!files)
        return null;

    return files.filter(file => file.fileAddress === fileAddress)[0];
}

export function getSharedFileAccess(aclJson, fileAddress, recieverPubKey) {
    var files = aclJson.acl.shares[recieverPubKey];
    if (!files)
        return null;

    return files.filter(file => file.fileAddress === fileAddress)[0];
}

export function listMyFiles(aclJson) {
    if (!aclJson.hasOwnProperty('acl')) {
        return [];
    }
    if (!aclJson.acl.hasOwnProperty('files')) {
        return [];
    }

    return aclJson.acl.files;
}

export function listSharedFiles(aclJson, recieverPubKey) {
    if (!aclJson.hasOwnProperty('acl')) {
        return [];
    }
    if (!aclJson.acl.hasOwnProperty('shares')) {
        return [];
    }
    if (!aclJson.acl.shares.hasOwnProperty(recieverPubKey)) {
        return [];
    }
    return aclJson.acl.shares[recieverPubKey];
}


//Test///////////////////////////////////////////////
export function test(aclFile) {
    debugger;
    var aclJson = {};
    addFileAccess(aclJson, "Mahmoud Public Key", "<IPFS fileA address>", "11111111111111111111", "AAAAAAAAAAAAAAAAAAAAAA");
    addFileAccess(aclJson, "Mahmoud Public Key", "<IPFS fileB address>", "22222222222222222222222222", "BBBBBBBBBBBBBBBBBBBBBBBBBBB");
    var file = getMyFileAccess(aclJson, "<IPFS fileB address>");

    shareFile(aclJson, "Maha Public Key", "<IPFS fileA address>", "1X1X1X1X1X1X1X1X1X", "AXAXAXAXAXAXAXAXAXAXAX");
    shareFile(aclJson, "Maha Public Key", "<IPFS fileB address>", "2X2X2X2X2X2X2X2X2X", "BXBXBXBXBXBXBXBXBXBXBX");
    var mahaFile = getSharedFileAccess(aclJson, "<IPFS fileB address>", "Maha Public Key")
    var mahaFileFail = getSharedFileAccess(aclJson, "<IPFS fileB address>", "Maha Public Keysssssssssss")

    shareFile(aclJson, "Taher Public Key", "<IPFS fileA address>", "1111111111111XXXXXXXXXXXXXX", "AAAAAAAAAAAAAXXXXXXXXXXXXXXX");
    var taherFile = getSharedFileAccess(aclJson, "<IPFS fileA address>", "Taher Public Key")
    var taherFileFail = getSharedFileAccess(aclJson, "<IPFS fileA addressvvvvvvvvvvvvv>", "Taher Public Key")

    var myFiles = listMyFiles(aclJson);
    var mahaFiles = listMyFiles(aclJson, "Maha Public Key");
    var success = JSON.stringify(aclFile) === JSON.stringify(aclJson);
}