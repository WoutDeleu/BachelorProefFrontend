import React,{Component} from 'react'
import backendURL from "../backendURL";
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useParams} from "react-router-dom";
import isRole from "../hooks/isRole";
import subDelete from "../hooks/subDelete";


const PromotorDetails =()=> {
    const [promotor,setPromotor] = useState('');
    const [id] = useState(useParams().id);
    const [userLoaded, setUserLoaded] = useState(false);

    if(!userLoaded){
        let axios = require('axios');
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/' + id,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                if(promotor==='')setPromotor(res.data);
                setUserLoaded(true);
                console.log("userLoaded")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        (userLoaded) ?
            (
                <Container fluid="sm">
                    <div className="card text-black bg-white m-3">
                        <div className="row">
                            <div className="col m-3">
                                Name: {promotor.firstName} {promotor.lastName}
                            </div>
                            <div className="col m-3">
                                Email: {promotor.email}
                            </div>
                            <div className="col m-3">
                                telNr: {promotor.telNr}
                            </div>
                        </div>
                    </div>
                </Container>
            )
            : <p>Loading</p>
    );
}

export default PromotorDetails;