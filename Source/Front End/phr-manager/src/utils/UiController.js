import * as StorageHelper from "./StorageHelper";
import * as EncryptionHelper from "./EncryptionHelper"
import * as ACLManager from '../utils/ACLManager'
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
                console.log("cipher: " + cipher);

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
                        console.log("Current fileAccess: "+JSON.stringify(fileAccess));
                        
                        ACLManager.addNewFileAccessAsync(fileAccess)
                        .then(()=>{
                            var accessFile = ACLManager.getEncryptedACLJson();
                            console.log("Updated  ACL: "+JSON.stringify(accessFile));
                       
                            // store ACL in ipfs(encryption included) 
                            
                            
                            StorageHelper.uploadAclFile(accessFile, accountPublicAddress)
                                .then((aclHash) => {
                                    
                                    PHRSmartContractHelper.setACLFileAddress(aclHash, (smartContractError, smartContractResult) => {
                                      
                                        if (smartContractError) {
                                            console.log(smartContractError);
                                            reject(smartContractError);
                                        } else {
    
                                            
                                            let uploadResult = {
                                                accessFile,
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


export function getMyACLFile(publicKey, privateKey){
 return new Promise((resolve, reject) => {
    PHRSmartContractHelper.getACLFileAddress(publicKey,(error, myAclRes)=>{
        if(error){
            debugger;
            reject(error)  
        }
        else{
            StorageHelper.downloadAclFile(myAclRes)
                .then(aclFileres=>{
                    resolve(aclFileres);
                });
            
        }
    })
 });
}