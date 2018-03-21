import React, { Component } from 'react';
import '../App.css';

// import { Row, Col } from 'antd'
// import 'antd/lib/button/style/css';

import * as EncryptionHelper from '../utils/EncryptionHelper'
import * as CommonHelper from '../utils/CommonHelper'

class LoginViewer extends Component {

    generatePblicKey() {
        var pubKey = EncryptionHelper.generatePubKey(this.props.privateKey);
        this.props.onPublicKeyChanged(pubKey);

    }
    login() {
        if(!CommonHelper.isValidString(this.props.privateKey) || !CommonHelper.isValidString(this.props.publicKey)){
            CommonHelper.notify("Enter  public and private keys")
            return;
        }
        this.props.onLogin();
    }
    createAccount() {
        var keys = EncryptionHelper.generatePubPrivateKeys();
        this.props.onPublicKeyChanged(keys.publicKey);
        this.props.onPrivateKeyChanged(keys.privateKey);
    }
    render() {
        return (
            <div className=' login-container'>
                <input
                    placeholder='Enter your private key'
                    className='input-common'
                    value={this.props.privateKey}
                    onChange={e => this.props.onPrivateKeyChanged(e.target.value)}
                />
                <button
                    className='btn-generatePubKey'
                    onClick={e => this.generatePblicKey()}>
                    Generate public key
                </button>
                <br />
                <input
                    placeholder='Enter your public key'
                    className='input-common'
                    value={this.props.publicKey}
                    onChange={e => this.props.onPublicKeyChanged(e.target.value)}
                />
                <br />
                <br />

                <button
                    className='btn-common btn-login'
                    onClick={e => this.login()}>
                    Login
                </button>
                <button
                    className='btn-common btn-createaccount'
                    onClick={e => this.createAccount()}>
                    Generate new keys
                </button>

            </div>
        );
    }
}

export default LoginViewer;