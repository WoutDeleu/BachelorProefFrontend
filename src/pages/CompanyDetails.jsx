import React,{Component} from 'react'
import backendURL from "../backendURL";
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useParams} from "react-router-dom";


const CompanyDetails =()=> {
    const [company,setCompany] = useState('');
    const [id] = useState(useParams().id);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [approved, setApproved] = useState();
    var axios = require('axios');
    var config = {
        method: 'get',
        url: backendURL + '/userManagement/company/' + id,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
        }
    };
    axios(config)
        .then(function (res) {
            if(company==='')setCompany(res);
            setHasLoaded(true);
            setApproved(res.data.approved);
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        });

    const approve =()=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'true');

        let config = {
            method: 'put',
            url: backendURL + '/userManagement/company/'+id+'/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setApproved(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const disapprove =()=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'false');

        let config = {
            method: 'put',
            url: backendURL + '/userManagement/company/'+id+'/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setApproved(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        hasLoaded ?
            (
                <Container fluid="sm">
                    <div  className="card text-black bg-white m-3">
                        <div className="col">
                            <div className="row">
                                <h6 className="m-3" >{company.data.name}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.data.description}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.data.address}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.data.btwnr}</h6>
                            </div>
                        </div>
                        <div className={"m-3"}>
                            Contacts:
                            {company.data.contacts}
                        </div>
                        {approved?
                            <Button onClick={()=>{disapprove()}} className={"m-3"} variant={"outline-danger"}>
                                Disapprove
                            </Button>
                        :
                            <Button onClick={()=>{approve()}} className={"m-3"} variant={"outline-success"}>
                                Approve
                            </Button>
                        }
                    </div>
                </Container>)
            : <p></p>
    );
}

export default CompanyDetails;