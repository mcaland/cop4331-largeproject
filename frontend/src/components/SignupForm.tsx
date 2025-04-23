// goes inside Register.tsx for registering for our site

import React from 'react';

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function SignupForm()
{
    const [userEmail, updateEmail] = React.useState('');
    const [userPassword, updatePassword] = React.useState('');
    const [err, updateError] = React.useState('');

    let alertElement = null;

    function handleEmailChange(e : any) : void
    {
        updateEmail(e.target.value);
    }

    function handlePasswordChange(e : any) : void
    {
        updatePassword(e.target.value);
    }

    function updateErrorMessage(e : string)
    {
        updateError(e);

        alertElement = <Alert variant='danger'>{err}</Alert>
    }

    async function doLogin(e : any) : Promise<void>
    {
        var obj = {email: userEmail, password: userPassword};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('https://largeproject.maudxd.online/api/regiser', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.id <= 0)
            {
                updateErrorMessage("Incorrect username/password combination.");
            }
            else
            {
                var user = {displayName: res.displayName, id: res.id};
                localStorage.setItem('user_data', JSON.stringify(user));

                window.location.href = '/home';
            }
        }
        catch (error : any)
        {
            updateErrorMessage(error.toString());
            return;
        }
    }

    return (
        <Card>
            <Container>
                <Card.Body>
                    <InputGroup>
                        <Stack gap={3}>
                            <Card.Title>Register for JamR</Card.Title>
                            {alertElement}
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

                            <Button id='signUpButton' href='/onboarding'>Sign up</Button>
                            <Form.Label muted>Already have an account? <Button variant='link' style={{padding: '0px'}} href='/login'>Log in here.</Button></Form.Label>
                        </Stack>
                    </InputGroup>
                </Card.Body>
            </Container>
        </Card>
    );
}

export default SignupForm;