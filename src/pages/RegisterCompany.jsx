import React,{Component} from 'react'
import backendURL from "../backendURL";
import {Button, Col, Form, Row, Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import qs from "qs";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";

class RegisterCompany extends Component{
    constructor(props){
        super(props);
        this.state = {
            company: {
                name: "",
                address: "",
                btwNr: "",
                description: ""
            },
            contacts: [],
            inputContacts: [],

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        //Get all contacts
        const self = this;
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/contact',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                console.log(res.data);
                self.setState({contacts: res.data});
            }).catch(function (error) {
        });
    }

    handleSubmit = (e) =>{
        console.log(this.state);
        e.preventDefault()
        let axios = require('axios');
        let FormData = require('form-data');
        let data = qs.stringify(this.state.company);
        console.log(data);
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/company',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            },
            data : data
        };
        const self = this;
        axios(config)
            .then(function (response) {
                let data = new FormData();
                for(let i =0; i<self.state.inputContacts.length; i++){
                    data.append('userIds',self.state.inputContacts[i].id);
                }
                config = {
                    method: 'post',
                    url: backendURL + '/userManagement/company/' + response.data + '/addContact',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                    },
                    data : data
                };

                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.state.contacts);
        return (
            <Container style={{textAlign: "left"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row className={"mb-3"}>
                        <Form.Group as={Col}  >
                            <Form.Label >Name</Form.Label>
                            <Form.Control type={"text"} name={"name"} id={"name"}
                                          onChange={(e) => this.setState(prevState => ({
                                              company: {
                                                  ...prevState.company,
                                                  name: e.target.value
                                              }
                                          }))}
                                          required/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type={"text"} name={"address"} id={"address"}
                                      onChange={(e) => this.setState(prevState => ({
                                          company: {
                                              ...prevState.company,
                                              address: e.target.value

                                          }
                                      }))}
                                      required/>
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>BTW</Form.Label>
                        <Form.Control type={"text"} name={"btwNr"} id={"btwNr"}
                                      onChange={(e) => this.setState(prevState => ({
                                          company: {
                                              ...prevState.company,
                                              btwNr: e.target.value
                                          }
                                      }))}
                                      required/>
                    </Form.Group>
                    <InputGroup className={"pt-3 pb-3"}>
                        <Form.Label>Contacts</Form.Label>
                        <div style={{width: '100%'}}>
                            <Select
                                key={"Contacts"}
                                fluid="sm"
                                options={this.state.contacts}
                                getOptionLabel={(options) => options['firstName'] + ' ' +options['lastName']}
                                getOptionValue={(options) => options['id']}
                                isMulti
                                onChange={(e) => this.setState({inputContacts: e})}>
                            </Select>
                        </div>
                    </InputGroup>
                    <Form.Group  className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type={"text"} name={"description"} id={"description"}
                                      onChange={(e) => this.setState(prevState => ({
                                          company: {
                                              ...prevState.company,
                                              description: e.target.value
                                          }
                                      }))}
                                      required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type="submit" onSubmit={this.handleSubmit} >Register</Button>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

export default RegisterCompany;