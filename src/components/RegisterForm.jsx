import React,{Component} from 'react'
import {Button, Col, Form, Row, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            telNr: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.Register(this.state);
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <Container style={{textAlign: "left"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row className={"mb-3"}>
                        <Form.Group as={Col}  >
                            <Form.Label >First Name</Form.Label>
                            <Form.Control type="firstName" required/>
                        </Form.Group>
                        <Form.Group as={Col}  >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" required/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required/>
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>TelNr</Form.Label>
                        <Form.Control type="telNr" required/>
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type="submit" onSubmit={this.handleSubmit} >Register</Button>
                    </Form.Group>
                </Form>
            </Container>


        );
    }
}

export default RegisterForm;