import React, { Component } from 'react';
import '../App.css'

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
                        <th>{this.props.title}</th>
                    </tr>
                    {
                        this.props.files.map((file, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {file.encryptedFileName}
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