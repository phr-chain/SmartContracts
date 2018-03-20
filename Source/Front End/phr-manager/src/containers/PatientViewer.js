import React, { Component } from 'react';
import { Row, Col, Button } from 'antd'
import 'antd/lib/button/style/css';

import * as EncryptionHelper from '../utils/EncryptionHelper'
import * as StorageHelper from '../utils/StorageHelper'
import * as PHRHelper from '../utils/PHRSmartContractHelper'
import * as EthHelper from '../utils/EtherumHelper'
import * as ACLHelper from '../utils/ACLHelper'

class PatientViewer extends Component {
    uploadFile = (e) => {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        var plainFile = reader.result;

        var sKey = EncryptionHelper.generateSharedKey();
        var encryptedFile = EncryptionHelper.encrypt(plainFile, sKey);
        var fileAddress = StorageHelper.uploadFile(encryptedFile);
        
        // var aclFile = PHRHelper.getACLFileAddress(this.props.myPublicKey, (error, res) => {
        //     if(res != null || res != '')
            
        //   });
  
        // PHRHelper.addACLFileAddress(this.props.myPublicKey, fileAddress, (error, res) => {
            
        //   });

        //var fileName = e.target.files[0].name;
    }

    render() {
        //ACLHelper.test();
        return (
            <input type="file" onChange={this.uploadFile} />
        );
    }
}

export default PatientViewer;