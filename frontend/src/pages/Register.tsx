// register page for the site

import SignupForm from "../components/SignupForm";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register()
{
    return (
        <Container style={{height: '100%'}} className="my-auto">
            <Row style={{height: '100%'}} className="align-items-center my-auto">
                <Col>
                    <SignupForm />
                </Col>
            </Row>
        </Container>
    );
};

export default Register;