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

                // upoade file 
                StorageHelper.uploadFile(cipher)
                    .then((fileHash) => {
                        // add file access
                        let fileAccess = {
                            fileAddress: fileHash,
                            symmetricKey: genSymmetricKey,
                            fileName: fileName,
                            size: fileLength,
                            mimeType: fileType
                        };
                        ACLHelper.addFileAccess(currentACL, accountPublicAddress, fileAccess);

                        // store ACL in ipfs(encryption included) 
                        StorageHelper.uploadAclFile(currentACL, accountPublicAddress)
                            .then((aclHash) => {
                                PHRSmartContractHelper.setACLFileAddress(aclHash, (smartContractError, smartContractResult) => {
                                    if (error) {
                                        reject(smartContractError);
                                    } else {

                                        resolve({
                                            currentACL,
                                            fileHash,
                                            aclHash

                                        });
                                    }
                                })
                            })
                            .catch((aclStoreError) => {
                                reject(aclStoreError);
                            });
                    })
                    .catch((uploadErr) => {
                        reject(uploadErr);
                    });



                //

            }

        } catch (error) {
            reject(error);
        }
    });

    reader.readAsArrayBuffer(file);
}