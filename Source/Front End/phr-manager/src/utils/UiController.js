import * as StorageHelper from "./StorageHelper";
import * as EncryptionHelper from "./EncryptionHelper"
import * as ACLHelper from "./ACLHelper"
import * as PHRSmartContractHelper from "./PHRSmartContractHelper"

export function uploadFileToAccount(file, accountPublicAddress, currentACL) {

    var reader = new FileReader();
    return new Promise((resolve, reject) => {

        try {

            reader.onload = (readedFile) => {
                var fileName = file.name;
                var fileType = file.type;
                var fileLength = file.size;
                var arrayBuffer = readedFile.target.result;

                // encrypt file
                var genSymmetricKey = EncryptionHelper.generateSharedKey();
                var cipher = EncryptionHelper.encrypt(arrayBuffer, genSymmetricKey);
                console.log("Cupher: " + cipher);

                // upoade file 
                StorageHelper.uploadFile(cipher)
                    .then((fileHash) => {
                        // add file access
                        debugger;
                        let fileAccess = {
                            fileAddress: fileHash,
                            symmetricKey: genSymmetricKey,
                            fileName: fileName,
                            size: fileLength,
                            mimeType: fileType
                        };
                        console.log("Current fileAccess: "+JSON.stringify(fileAccess));
                        
                        ACLHelper.addFileAccess(currentACL, accountPublicAddress, fileAccess);
                        console.log("Updated  ACL: "+JSON.stringify(currentACL));
                       
                        // store ACL in ipfs(encryption included) 
                        StorageHelper.uploadAclFile(currentACL, accountPublicAddress)
                            .then((aclHash) => {
                                PHRSmartContractHelper.setACLFileAddress(aclHash, (smartContractError, smartContractResult) => {
                                    if (smartContractError) {
                                        console.log(smartContractError);
                                        reject(smartContractError);
                                    } else {

                                        let uploadResult = {
                                            currentACL,
                                            fileHash,
                                            aclHash

                                        };

                                        console.log(JSON.stringify(uploadResult));
                                        resolve(uploadResult);
                                    }
                                })
                            })
                            .catch((aclStoreError) => {
                                console.log(aclStoreError);
                                reject(aclStoreError);
                            });
                    })
                    .catch((uploadErr) => {
                        console.log(uploadErr);
                        reject(uploadErr);
                    });



                //

            }

        } catch (error) {
            reject(error);
        }
        reader.readAsArrayBuffer(file);
    });

  
}