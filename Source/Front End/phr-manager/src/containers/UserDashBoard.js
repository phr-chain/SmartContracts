import React, { Component } from 'react';

import * as EncryptionHelper from '../utils/EncryptionHelper'
import * as StorageHelper from '../utils/StorageHelper'
import * as PHRHelper from '../utils/PHRSmartContractHelper'
import * as ACLManager from '../utils/ACLManager'
import * as CommnHelper from '../utils/CommonHelper'
import * as Test from '../utils/TestData'

import FilesList from '../components/FilesList'
import SharedFiles from '../components/SharedFiles'
import * as UiController from '../utils/UiController'


import saveAs from 'save-as'
import '../App.css';

class UserDashBoard extends Component {

    uploadFile = (e) => {
        //TODO

        // var reader = new FileReader();
        // var file = e.target.files[0];

        // // Closure to capture the file information.
        // reader.onload = (function (file) {
        //     return function (evt) {
        //         var fileName = file.name;
        //         var fileType = file.type;
        //         var fileLength = file.size;

        //         var symmetricKey = EncryptionHelper.generateSharedKey();

        //         var arrayBuffer = reader.result;
        //         var cipher = EncryptionHelper.encrypt(arrayBuffer, symmetricKey);
        //         var decryptedByteArray = EncryptionHelper.decryptAsByteArray(cipher, symmetricKey, fileLength);
        //         var blob = new Blob([decryptedByteArray], { type: fileType }).slice(0, fileLength);
        //         saveAs(blob, 'decrypted-' + fileName)

        //         // var blob1 = new Blob([byteArray], {type: "application/octet-stream"});
        //         //var fileAddress = StorageHelper.uploadFile(encryptedFile);

        //         // var pubKey = EthHelper.getCurrentAccount();
        //         // var encryptedSharedKey =  EncryptionHelper.encrypt(symmetricKey, pubKey);
        //         //PHRHelper.addFileAccess(fileAddress, encryptedSharedKey);
        //     };
        // })(file);
        // reader.readAsArrayBuffer(file);
        
        UiController.uploadFileToAccount(e.target.files[0],this.props.publicKey,{})
        .then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }

    downloadMyFile(fileData) {
        //TODO
        alert(JSON.stringify(fileData))

    }
    shareMyFile(fileData) {
        //TODO
        var recieverublicKey = prompt("Please enter reciever public key");
        if(CommnHelper.isValidString(recieverublicKey)){
            alert(recieverublicKey)
        }
        
    }

    downloadSharedWithMeFile(fileData) {
        //TODO
        alert(JSON.stringify(fileData))
    }
    
    fetchFilesSharedWithMe() {
        //TODO
        var recieverublicKey = prompt("Please enter BLOCKCHAIN public key of the user who shares files with you");
        if(CommnHelper.isValidString(recieverublicKey)){
            alert(recieverublicKey)
            /* 
            * Ask smart contract about address of acl file of his user
            * download the acl file from IFS
            * Copy your section of his shared files into your shared wit me files under his public key section
            * upload your new ACL
            */
        }
        
    }

    constructor() {
        super();
        this.state = { aclFile: {}, sharedWithMeAcls: [] };
    }

    aclUpdated(){
        this.reloadACL();
    }

    reloadACL(){
        ACLManager.readAsync().then((newAclState)=>{
            // newAclState contains {files, shares, sharedWithMe}
            this.setState(newAclState);
        });
    }

    componentWillMount() {
        // TODO: init myAclEncJson from IPFS & ETH
        var myAclEncJson = {}; 
        ACLManager.init(this.state.publicKey, this.state.privateKey, this.updateACL, myAclEncJson );
        this.reloadACL();
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
                    files={this.files}
                    downloadMyFile={this.downloadMyFile}
                    shareMyFile={this.shareMyFile}
                    title = 'My uploaded files'
                    
                />
                <SharedFiles
                    files={this.shares}
                    sharedWithMeMode = {false}
                    title = 'Files I shared'
                />

                <SharedFiles
                    files={this.sharedWithMe}
                    sharedWithMeMode = {true}
                    title = 'Files shared with me'
                    downloadFile={this.downloadSharedWithMeFile}
                />
                
                <br />
                <input type="file" name="file" id="file" className="inputfile" onChange={this.uploadFile} />
                <label htmlFor="file" className='btn-inline'>Upload</label>

                <button className='btn-inline' onClick={e => this.fetchFilesSharedWithMe()}>Fetch files shared with me</button>
            </div>
        );
    }
}

export default UserDashBoard;