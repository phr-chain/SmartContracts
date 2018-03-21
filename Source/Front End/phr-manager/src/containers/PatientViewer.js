import React, { Component } from 'react';
import { Row, Col, Button } from 'antd'
import 'antd/lib/button/style/css';

import * as EncryptionHelper from '../utils/EncryptionHelper'
import * as StorageHelper from '../utils/StorageHelper'
import * as PHRHelper from '../utils/PHRSmartContractHelper'
import * as EthHelper from '../utils/EtherumHelper'
import {saveAs} from 'file-saver';
import * as ACLHelper from '../utils/ACLHelper'
var FileSaver = require('file-saver');
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
                var symmetricKey = EncryptionHelper.generateSharedKey();
                var encryptedText = EncryptionHelper.encrypt(fileAsUtf8Text, symmetricKey);
                var original = EncryptionHelper.decrypt(encryptedText, symmetricKey);
                // var blob = new Blob([original], {type: "text/plain;charset=utf-8"});
                // FileSaver.saveAs(blob, "encrypted-hello.txt");
                var new_file = new File([original], "encrypted-world.txt", {type: "text/plain;charset=utf-8"});
                
                try{
                    window.saveAs(new_file);
                } catch(e){
                    console.log("222222222222", e);
                }
                try{
                    saveAs(new_file);
                } catch(e){
                    console.log("3333333333333", e);
                }
                console.log("original", original);
                
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