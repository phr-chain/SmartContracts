import React, { Component } from 'react';
import '../App.css'

class SharedFiles extends Component {
    renderDownload(file){
        return this.props.downloadFile ? <button className='btn-inline right_align' onClick={e => this.props.downloadFile(file)}> Download</button>: null;
    }
    render() {
        return (
            <table className='inline_dislay'>
                <tbody>
                    <tr><h3>{this.props.title}:</h3></tr>
                    <tr>
                        <th>File name</th>
                        <th>{this.props.sharedWithMeMode ? 'Shared by' : 'Shared to'}</th>
                    </tr>
                    {
                        this.props.files.map((file, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {file.fileName}
                                        {this.renderDownload(file)}
                                    </td>
                                    <td>
                                        {file.owner}
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export default SharedFiles;