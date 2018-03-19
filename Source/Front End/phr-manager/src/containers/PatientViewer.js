import React, { Component } from 'react';
import { Row, Col, Button } from 'antd'
import 'antd/lib/button/style/css';
import * as EthHelper from '../utils/EtherumHelper'

// import { FilePicker } from 'react-file-picker'



class PatientViewer extends Component {
    uploadFile = (e) => {
        alert(EthHelper.getCurrentAccount())
        debugger;
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        var fileData = reader.result;

    }
    render() {
        return (
            <Row >
                <Col>
                    <input type="file" onChange={this.uploadFile} />

                    {/* <FilePicker onChange={this.uploadFile}>
                        <Button>Upload</Button>
                    </FilePicker> */}
                </Col>
            </Row>
        );
    }
}

export default PatientViewer;