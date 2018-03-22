import * as StorageHelper from "./StorageHelper";
import * as EncryptionHelper from "./EncryptionHelper"
import * as ACLHelper from "./ACLHelper"

export function uploadFileToAccount(file, accountPublicAddress) {

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

                StorageHelper.uploadFile(cipher)
                    .then((hashRes) => {
                        let fileAccess = {
                            fileAddress: hashRes,
                            symmetricKey: genSymmetricKey,
                            fileName: fileName,
                            size: fileLength,
                            mimeType: fileType
                        };
                        ACLHelper.addFileAccess(fileAccess, accountPublicAddress)
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