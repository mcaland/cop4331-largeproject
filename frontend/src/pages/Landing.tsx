// landing page for our site

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Landing()
{
    return (
        <Container style={{width: 'auto', height: '100%'}} className=''>
            <Row style={{height: '100%'}}>
                <Col style={{width: 'auto', height: 'auto'}} className='my-auto'>
                    <Row style={{width: 'auto', height: 'auto', paddingBottom: '3vh'}} className='justify-content-md-center text-center my-auto'>
                        <h1>JamR</h1>
                        <i>A solution for musicians to find other musicians!</i>
                    </Row>
                    <Row style={{width: 'auto', height: 'auto'}} className='align-items-center'>
                        <Stack dir='horizontal' style={{display: 'flex', gap: '5px'}} className='text-center'>
                            <Button href='/register' style={{width: 'auto', textAlign: 'center'}} className='mx-auto'>Sign up</Button>
                            <Button href='/login' style={{width: 'auto'}} className='d-flex mx-auto'>Log in</Button>
                        </Stack>
                    </Row>
                </Col>
            </Row>
            
        </Container>
    );
};

export default Landing;