// goes inside Login.tsx for logging into our site

import React from 'react';

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function LoginForm()
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
            const response = await fetch('https://largeproject.maudxd.online/api/login', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

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
                            <Card.Title>Login</Card.Title>
                            {alertElement}
                            <FloatingLabel controlId='floatingEmail' label='Email address'>
                                <Form.Control type='email' placeholder='johndoe@example.com' onChange={handleEmailChange} />
                            </FloatingLabel>

                            <FloatingLabel controlId='floatingPassword' label='Password'>
                                <Form.Control type='password' placeholder='strongPassword' onChange={handlePasswordChange} />
                            </FloatingLabel>

                            <Button id='loginButton' onClick={doLogin}>Log in</Button>

                            <Form.Label muted>Don't have an account? <Button variant='link' style={{padding: '0px'}} href='/register'>Sign up here.</Button></Form.Label>
                        </Stack>
                    </InputGroup>
                </Card.Body>
            </Container>
        </Card>
    );
}

export default LoginForm;