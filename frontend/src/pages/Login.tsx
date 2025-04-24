// login page for the site

import LoginForm from "../components/LoginForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login()
{
    return (
        <Container style={{height: '100%'}} className="my-auto">
            <Row style={{height: '100%'}} className="align-items-center my-auto">
                <Col>
                    <LoginForm />
                </Col>
            </Row>
            
        </Container>
    );
};

export default Login;