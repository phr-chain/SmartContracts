import React, { Component } from 'react';
import { Row, Col, Button } from 'antd'
import 'antd/lib/button/style/css';

import * as EncryptionHelper from '../utils/EncryptionHelper'
import * as StorageHelper from '../utils/StorageHelper'
import * as PHRHelper from '../utils/PHRSmartContractHelper'
import * as EthHelper from '../utils/EtherumHelper'

class PatientViewer extends Component {
    uploadFile = (e) => {

        debugger;
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        var plainFile = reader.result;
        
        var sKey = EncryptionHelper.generateSharedKey();
        var encryptedFile = EncryptionHelper.encrypt(plainFile, sKey);
        var fileAddress = StorageHelper.uploadFile(encryptedFile);

        var pubKey = EthHelper.getCurrentAccount();
        var encryptedSharedKey =  EncryptionHelper.encrypt(sKey, pubKey);
        PHRHelper.addFileAccess(fileAddress, encryptedSharedKey);

        //var fileName = e.target.files[0].name;
    }

    render() {
        return (
           <input type="file" onChange={this.uploadFile} />
        );
    }
}

export default PatientViewer;