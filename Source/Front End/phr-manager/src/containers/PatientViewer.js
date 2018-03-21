import React, { Component } from 'react';
import { Row, Col, Button } from 'antd'
import 'antd/lib/button/style/css';

import * as EncryptionHelper from '../utils/EncryptionHelper'
import * as StorageHelper from '../utils/StorageHelper'
import * as PHRHelper from '../utils/PHRSmartContractHelper'
import * as EthHelper from '../utils/EtherumHelper'
import * as ACLHelper from '../utils/ACLHelper'
import saveAs from 'save-as'
const CryptoJS = require("crypto-js");

class PatientViewer extends Component {
    uploadFile = (e) => {
        var reader = new FileReader();
        var file = e.target.files[0];

        // Closure to capture the file information.
        reader.onload = (function(file) {
            return function(evt) {
                var fileAsUtf8Text = reader.result;
                var fileName = file.name;
                var fileType = file.type;
                var symmetricKey = EncryptionHelper.generateSharedKey();
                var encryptedText = EncryptionHelper.encrypt(fileAsUtf8Text, symmetricKey);
                var decrypted = EncryptionHelper.decrypt(encryptedText, symmetricKey);
                var blob = new Blob([decrypted], {type: fileType});
                saveAs(blob, 'decrypted-'+fileName)
                
                // var blob1 = new Blob([byteArray], {type: "application/octet-stream"});
                //var fileAddress = StorageHelper.uploadFile(encryptedFile);
                
                // var pubKey = EthHelper.getCurrentAccount();
                // var encryptedSharedKey =  EncryptionHelper.encrypt(symmetricKey, pubKey);
                //PHRHelper.addFileAccess(fileAddress, encryptedSharedKey);
            };
        })(file);
        reader.readAsText(file);
    }

    render() {
        ACLHelper.test();
        return (
            <input type="file" onChange={this.uploadFile} />
        );
    }
}

export default PatientViewer;