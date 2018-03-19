import React, { Component } from 'react';
import { Row, Col, Button } from 'antd'
import 'antd/lib/button/style/css';

class PatientViewer extends Component {
    uploadFile = (e) => {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        var fileData = reader.result;

    }
    render() {
        return (
            <Row >
                <Col>
                    <input type="file" onChange={this.uploadFile} />
                </Col>
            </Row>
        );
    }
}

export default PatientViewer;