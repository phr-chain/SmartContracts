import React, { Component } from 'react';

import {Icon } from 'antd'
import 'antd/lib/button/style/css';


import * as EncryptionHelper from '../utils/EncryptionHelper'
import * as StorageHelper from '../utils/StorageHelper'
import * as PHRHelper from '../utils/PHRSmartContractHelper'
import * as ACLHelper from '../utils/ACLHelper'
import * as CommnHelper from '../utils/CommonHelper'

import FilesList from '../components/FilesList'
import saveAs from 'save-as'
import '../App.css';

const CryptoJS = require("crypto-js");

const testAclFile =
    {
        "acl": {
            "publicAddress": "Mahmoud Public Key",
            "files": [
                {
                    "fileAddress": "<IPFS fileA address>",
                    "encryptedSymmetricKey": "11111111111111111111",
                    "encryptedFileName": "AAAAAAAAAAAAAAAAAAAAAA"
                }, {
                    "fileAddress": "<IPFS fileB address>",
                    "encryptedSymmetricKey": "22222222222222222222222222",
                    "encryptedFileName": "BBBBBBBBBBBBBBBBBBBBBBBBBBB"
                }
            ],
            "shares": {
                "Maha Public Key": [
                    {
                        "fileAddress": "<IPFS fileA address>",
                        "encryptedSymmetricKey": "1X1X1X1X1X1X1X1X1X",
                        "encryptedFileName": "AXAXAXAXAXAXAXAXAXAXAX"
                    }, {
                        "fileAddress": "<IPFS fileB address>",
                        "encryptedSymmetricKey": "2X2X2X2X2X2X2X2X2X",
                        "encryptedFileName": "BXBXBXBXBXBXBXBXBXBXBX"
                    }
                ],
                "Taher Public Key": [
                    {
                        "fileAddress": "<IPFS fileA address>",
                        "encryptedSymmetricKey": "1111111111111XXXXXXXXXXXXXX",
                        "encryptedFileName": "AAAAAAAAAAAAAXXXXXXXXXXXXXXX"
                    }
                ]
            },
            "sharedWithMe": {
                "Bob Public Key": [
                    {
                        "fileAddress": "<IPFS filexxx address>",
                        "encryptedSymmetricKey": "aaaaaaaaaaa",
                        "encryptedFileName": "aaaaaaaaaname"
                    }, {
                        "fileAddress": "<IPFS fileyyy address>",
                        "encryptedSymmetricKey": "bbbbbbbbbbbb",
                        "encryptedFileName": "bbbbbbbbbname"
                    }
                ],
                "Alice Public Key": [
                    {
                        "fileAddress": "<IPFS filezzz address>",
                        "encryptedSymmetricKey": "cccccccccccccccc",
                        "encryptedFileName": "cccccccccccname"
                    }
                ]
            }

        }
    }

class PatientViewer extends Component {

    uploadFile = (e) => {
        var reader = new FileReader();
        var file = e.target.files[0];

        // Closure to capture the file information.
        reader.onload = (function (file) {
            return function (evt) {
                var fileName = file.name;
                var fileType = file.type;
                var fileLength = file.size;

                var symmetricKey = EncryptionHelper.generateSharedKey();

                var arrayBuffer = reader.result;
                var cipher = EncryptionHelper.encrypt(arrayBuffer, symmetricKey);
                var decryptedByteArray = EncryptionHelper.decryptAsByteArray(cipher, symmetricKey, fileLength);
                var blob = new Blob([decryptedByteArray], { type: fileType }).slice(0, fileLength);
                saveAs(blob, 'decrypted-' + fileName)

                // var blob1 = new Blob([byteArray], {type: "application/octet-stream"});
                //var fileAddress = StorageHelper.uploadFile(encryptedFile);

                // var pubKey = EthHelper.getCurrentAccount();
                // var encryptedSharedKey =  EncryptionHelper.encrypt(symmetricKey, pubKey);
                //PHRHelper.addFileAccess(fileAddress, encryptedSharedKey);
            };
        })(file);
        reader.readAsArrayBuffer(file);
    }

    downloadMyFile(fileData) {
        alert(JSON.stringify(fileData))

    }
    shareMyFile(fileData) {
        alert(JSON.stringify(fileData))
    }
    downloadSharedFile(fileData) {
        alert(JSON.stringify(fileData))
    }

    myFiles = () => ACLHelper.listMyFiles(this.state.aclFile);
    sharedWithMeFiles = (recieverACL, recieverPubKey) => ACLHelper.listSharedFiles(recieverACL, recieverPubKey);

    constructor() {
        super();
        this.state = { aclFile: {}, sharedWithMeAcls: [] };
    }
    componentWillMount() {
        this.setState({ aclFile: testAclFile });

        //TODO
        // PHRHelper.getMyACLFileAddress((error, result)=>{
        //     if(error){
        //         CommnHelper.notify("Unable to get acl file");
        //     }else{
        //         acl = StorageHelper.downloadFile(result);
        //         this.setState({aclFile: acl});
        //     }
        // })
    }
    render() {
        return (
            <div className=' page-container'>
                <a className='right_align' href='#' target='_self' onClick={e => this.props.onLogout()}>Log out</a>
                <div className='right_align'> {this.props.publicKey} &nbsp;&nbsp;</div>
                <br />
                <FilesList
                    files={this.myFiles()}
                    downloadMyFile={this.downloadMyFile}
                    shareMyFile={this.shareMyFile}
                    privateKey = {this.props.privateKey}
                />

                {/* <FilesList
                    files={this.sharedWithMeFiles()}
                    downloadMyFile={this.downloadSharedFile}
                    title='Files shared with me'
                /> */}
                <br />
                <br />
                <br />

                {/* <input type="file" onChange={this.uploadFile} className='btn-common btn-login'/> */}
                {/* <div className='btn-common btn-login' > */}
                    <input type="file" name="file" id="file" className="inputfile" onChange={this.uploadFile} />
                    <label htmlFor="file" className='btn-common btn-login'>Upload</label>
                {/* </div> */}


                {/* <input type="file" onChange={this.uploadFile} /> */}
            </div>
        );
    }
}

export default PatientViewer;