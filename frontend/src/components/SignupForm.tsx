// goes inside Register.tsx for registering for our site

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function SignupForm()
{
    return (
        <Card>
            <Container>
                <Card.Body>
                    <InputGroup>
                        <Stack gap={3}>
                            <Card.Title>Register for JamR</Card.Title>
                            
                            <FloatingLabel controlId='floatingName' label='Display name'>
                                <Form.Control type='text' placeholder='John Doe'/>
                            </FloatingLabel>

                            <FloatingLabel controlId='floatingEmail' label='Email address'>
                                <Form.Control type='email' placeholder='johndoe@example.com'/>
                            </FloatingLabel>

                            <FloatingLabel controlId='floatingPassword' label='Password'>
                                <Form.Control type='password' placeholder='strongPassword'/>
                                <Form.Text muted>
                                    Your password must be at least 16 characters long, containing numbers, uppercase and lowercase letters, and special characters.
                                </Form.Text>
                            </FloatingLabel>


                            <FloatingLabel controlId='floatingPasswordConfirm' label='Confirm password'>
                                <Form.Control type='password' placeholder='strongPassword'/>
                                <Form.Text muted>
                                    Please retype your password.
                                </Form.Text>
                            </FloatingLabel>

                            <Form.Label muted>These details can be changed on your account page.</Form.Label>

                            <Button id='signUpButton'>Sign up</Button>
                            <Form.Label muted>Already have an account? <Button variant='link' style={{padding: '0px'}}>Log in here.</Button></Form.Label>
                        </Stack>
                    </InputGroup>
                </Card.Body>
            </Container>
        </Card>
    );
}

export default SignupForm;