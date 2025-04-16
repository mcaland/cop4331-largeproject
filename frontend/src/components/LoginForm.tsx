// goes inside Login.tsx for logging into our site

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function LoginForm()
{
    return (
        <Card>
            <Container>
                <Card.Body>
                    <InputGroup>
                        <Stack gap={3}>
                            <Card.Title>Login</Card.Title>
                            <FloatingLabel controlId='floatingEmail' label='Email address'>
                                <Form.Control type='email' placeholder='johndoe@example.com'/>
                            </FloatingLabel>

                            <FloatingLabel controlId='floatingPassword' label='Password'>
                                <Form.Control type='password' placeholder='strongPassword'/>
                            </FloatingLabel>

                            <Button id='signUpButton'>Log in</Button>

                            <Form.Label muted>Don't have an account? <Button variant='link' style={{padding: '0px'}}>Sign up here.</Button></Form.Label>
                        </Stack>
                    </InputGroup>
                </Card.Body>
            </Container>
        </Card>
    );
}

export default LoginForm;