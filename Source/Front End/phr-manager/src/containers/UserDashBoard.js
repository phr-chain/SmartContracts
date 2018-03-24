import React, { Component } from 'react';
import { Spin } from "antd"
import 'antd/dist/antd.css'

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
        this.setState({ actionIsLoading: true })
        UiController.uploadFileToAccount(e.target.files[0], this.props.publicKey, {})
            .then(res => {
                console.log(res);
                this.setState({ actionIsLoading: false })
            }).catch(err => {
                console.log(err);
                this.setState({ actionIsLoading: false })
            });
    }

    downloadMyFile(fileData) {
        UiController
            .downloadMyFileAsync(fileData)
            .then(console.log)
            .catch(console.error);
    }
    shareMyFile(fileData) {
        //TODO
        var recieverPublicKey = prompt("Please enter reciever public key");
        if (CommnHelper.isValidString(recieverPublicKey)) {
            UiController.shareFileWithAccount(fileData, recieverPublicKey)
                .then(res => {
                    console.log(res);
                    CommnHelper.notify("Share Done");
                }).catch(err => {
                    alert(err);
                })
        }

    }

    downloadSharedWithMeFile(fileData) {
        //TODO
        alert(JSON.stringify(fileData))
    }

    fetchFilesSharedWithMe() {
        //TODO
        var recieverublicKey = prompt("Please enter BLOCKCHAIN public key of the user who shares files with you");
        if (CommnHelper.isValidString(recieverublicKey)) {
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
        this.state = { actionIsLoading: false, aclFile: {}, sharedWithMeAcls: [] };
    }

    reloadACL() {
        this.setState({ actionIsLoading: true })
        ACLManager.readAsync().then((newAclState) => {
            this.setState({
                files: newAclState.files,
                shares: newAclState.shares,
                sharedWithMe: newAclState.sharedWithMe,
                actionIsLoading: false,
            });
            console.log("ACLManager.getEncryptedACLJson: ", ACLManager.getEncryptedACLJson());
        }).catch(e => {
            this.setState({ actionIsLoading: false });
        });
    }

    componentWillMount() {

        var myAclEncJson = {};
        this.setState({ actionIsLoading: true })
        UiController.getMyACLFile(this.props.publicKey, this.props.privateKey)
            .then(myAclFile => {
                ACLManager.init(this.props.publicKey, this.props.privateKey, this.reloadACL.bind(this), myAclFile);
                this.setState({ actionIsLoading: false })
            }).catch(err => {
                CommnHelper.notify("Unable to get acl file");
                this.setState({ actionIsLoading: false });
            });

        // if(error){
        //     
        // }else{
        //     acl = StorageHelper.downloadFile(result);
        //     this.setState({aclFile: acl});
        // }

    }
    render() {
        return (
            <Spin spinning={this.state.actionIsLoading} size='large' className='spinner'>
                <div className=' page-container'>
                    <a className='right_align' href='#' target='_self' onClick={e => this.props.onLogout()}>Log out</a>
                    <div className='right_align'> {this.props.publicKey} &nbsp;&nbsp;</div>
                    <br />
                    <FilesList
                        files={this.state.files}
                        downloadMyFile={this.downloadMyFile}
                        shareMyFile={this.shareMyFile}
                        title='My uploaded files'

                    />
                    <SharedFiles
                        files={this.state.shares}
                        sharedWithMeMode={false}
                        title='Files I shared'
                    />

                    <SharedFiles
                        files={this.state.sharedWithMe}
                        sharedWithMeMode={true}
                        title='Files shared with me'
                        downloadFile={this.downloadSharedWithMeFile}
                    />

                    <br />
                    <input type="file" name="file" id="file" className="inputfile" onChange={this.uploadFile} />
                    <label htmlFor="file" className='btn-inline'>Upload</label>

                    <button className='btn-inline' onClick={e => this.fetchFilesSharedWithMe()}>Fetch files shared with me</button>
                </div>
            </Spin>
        );
    }
}

export default UserDashBoard;