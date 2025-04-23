// landing page for our site

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Landing()
{
    return (
        <Container style={{width: '100%', height: '100%'}} className='d-flex'>
            <Row style={{width: '100%', height: '100%'}} className='bg-black justify-content-md-center'>
                <Col  md='auto' style={{width: '100%', height: '100%'}}>
                    <h1>JamR</h1>
                    <Stack dir='horizontal' style={{display: 'flex', gap: '5px'}}>
                        <Button href='/register'>Sign up</Button>
                        <Button href='/login'>Log in</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default Landing;