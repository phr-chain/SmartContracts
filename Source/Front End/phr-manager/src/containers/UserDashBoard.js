import React, { Component } from 'react';
import * as antd from "antd"

// import * as EncryptionHelper from '../utils/EncryptionHelper'
// import * as StorageHelper from '../utils/StorageHelper'
// import * as PHRHelper from '../utils/PHRSmartContractHelper'
import * as ACLManager from '../utils/ACLManager'
import * as CommnHelper from '../utils/CommonHelper'
// import * as Test from '../utils/TestData'
// import saveAs from 'save-as'

import FilesList from '../components/FilesList'
import SharedFiles from '../components/SharedFiles'
import * as UiController from '../utils/UiController'

import '../App.css';

class UserDashBoard extends Component {

    uploadFile = (e) => {
        
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

    reloadACL(){
        ACLManager.readAsync().then((newAclState)=>{
            this.setState({
                files: newAclState.files,
                shares: newAclState.shares,
                sharedWithMe: newAclState.sharedWithMe,
            });
            console.log("ACLManager.getEncryptedACLJson: ", ACLManager.getEncryptedACLJson());
        });
    }

    componentWillMount() {
        // TODO: init myAclEncJson from IPFS & ETH
        var myAclEncJson = {}; 
        //TODO
        UiController.getMyACLFile(this.props.publicKey, this.props.privateKey)
        .then(myAclFile=>{ 
            ACLManager.init(this.props.publicKey, this.props.privateKey, this.reloadACL.bind(this), myAclFile );

        });
            // if(error){
            //     CommnHelper.notify("Unable to get acl file");
            // }else{
            //     acl = StorageHelper.downloadFile(result);
            //     this.setState({aclFile: acl});
            // }
        
    }
    render() {
        return (
            <div className=' page-container'>
                <a className='right_align' href='#' target='_self' onClick={e => this.props.onLogout()}>Log out</a>
                <div className='right_align'> {this.props.publicKey} &nbsp;&nbsp;</div>
                <br />
                <FilesList
                    files={this.state.files}
                    downloadMyFile={this.downloadMyFile}
                    shareMyFile={this.shareMyFile}
                    title = 'My uploaded files'
                    
                />
                <SharedFiles
                    files={this.state.shares}
                    sharedWithMeMode = {false}
                    title = 'Files I shared'
                />

                <SharedFiles
                    files={this.state.sharedWithMe}
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