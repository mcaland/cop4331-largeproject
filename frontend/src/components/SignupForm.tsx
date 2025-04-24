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
    const [userName, updateName] = React.useState('');
    const [userEmail, updateEmail] = React.useState('');
    const [userPassword, updatePassword] = React.useState('');
    const [userPasswordChk, updatePasswordChk] = React.useState('');
    const [err, updateError] = React.useState('');
    const [alertElement, updateAlert] = React.useState(<></>);
    const [passwordState, updatePasswordState] = React.useState('password');
    const [passwordBtnText, updatePasswordBtnText] = React.useState('Show password');

    function handleNameChange(e : any) : void
    {
        updateName(e.target.value);
    }

    function handleEmailChange(e : any) : void
    {
        updateEmail(e.target.value);
    }

    function handlePasswordChange(e : any) : void
    {
        updatePassword(e.target.value);
    }

    function handlePasswordChkChange(e : any) : void
    {
        updatePasswordChk(e.target.value);
    }

    function updateErrorMessage(e : string)
    {
        updateError(e);

        updateAlert(<Alert variant='danger'>{e}</Alert>);
    }

    function handlePasswordVisibleChange(e : any)
    {
        if (passwordState === 'password')
        {
            updatePasswordState('text');
            updatePasswordBtnText('Hide password');
        }
        else
        {
            updatePasswordState('password');
            updatePasswordBtnText('Show password');
        }
    }

    async function doSignup(e : any) : Promise<void>
    {
        // check password regex and if the two match

            // password regex
        let passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!?@$%^&*-]).{16,}$");
        let test = passwordRegex.test(userPassword);
        
        if (!test)
        {
            updateAlert(<Alert variant='danger'>Password does not fulfill the requirements.</Alert>);
            return;
        }
        else // password fulfills requirements
        {
            if (userPassword !== userPasswordChk)
            {
                updateAlert(<Alert variant='danger'>Passwords do not match.</Alert>);
                return;
            }
        }

        var obj = { displayName: userName, email: userEmail, password: userPassword};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('https://largeproject.maudxd.online/api/auth/register', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                updateErrorMessage(res.error);
            }
            else
            {
                updateAlert(<Alert variant='success'>{res.message}</Alert>);
                var user = {
                    userID: res.userID,
                    displayName: res.displayName,
                    email: res.email,
                    skills: res.skills,
                    lookingFor: res.lookingFor,
                    matchedUsers: res.matchedUsers,
                    interestedUsers: res.interestedUsers,
                    imageUrl: res.imageUrl,
                    audioUrl: res.audioUrl
                };
                localStorage.setItem('user_data', JSON.stringify(user));

                window.location.href = '/onboarding';
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
                                <Form.Control type='text' placeholder='John Doe' onChange={handleNameChange}/>
                            </FloatingLabel>

                            <FloatingLabel controlId='floatingEmail' label='Email address'>
                                <Form.Control type='email' placeholder='johndoe@example.com' onChange={handleEmailChange}/>
                            </FloatingLabel>

                            <FloatingLabel controlId='floatingPassword' label='Password'>
                                <Form.Control type={passwordState} placeholder='strongPassword' onChange={handlePasswordChange}/>
                                <Form.Text muted>
                                    Your password must be at least 16 characters long, containing numbers, uppercase and lowercase letters, and special characters. <Button variant='primary' style={{padding: '4px'}} onClick={handlePasswordVisibleChange}>{passwordBtnText}</Button>
                                </Form.Text>
                            </FloatingLabel>


                            <FloatingLabel controlId='floatingPasswordConfirm' label='Confirm password'>
                                <Form.Control type={passwordState} placeholder='strongPassword' onChange={handlePasswordChkChange} />
                                <Form.Text muted>
                                    Please retype your password. <Button variant='primary' style={{padding: '4px'}} onClick={handlePasswordVisibleChange}>{passwordBtnText}</Button>
                                </Form.Text>
                            </FloatingLabel>

                            <Form.Label muted>These details can be changed on your account page.</Form.Label>

                            <Button id='signUpButton' onClick={doSignup}>Sign up</Button>
                            <Form.Label muted>Already have an account? <a href='/login'>Log in here.</a></Form.Label>
                        </Stack>
                    </InputGroup>
                </Card.Body>
            </Container>
        </Card>
    );
}

export default SignupForm;