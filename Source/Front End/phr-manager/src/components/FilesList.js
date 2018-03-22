import React, { Component } from 'react';
import '../App.css'

import * as EncryptionHelper from '../utils/EncryptionHelper'
class FilesList extends Component {
    renderShare(file)
    {
        return  this.props.shareMyFile? <button className='btn-inline right_align' onClick={e => this.props.shareMyFile(file)}> Share</button> : null;
    }
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>My files</th>
                    </tr>
                    {
                        this.props.files.map((file, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {EncryptionHelper.decrypt(file.encryptedFileName, file.encryptedSymmetricKey, this.props.privateKey)}
                                        <button className='btn-inline right_align' onClick={e => this.props.downloadMyFile(file)}> Download</button>
                                        {this.renderShare(file)}
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export default FilesList;