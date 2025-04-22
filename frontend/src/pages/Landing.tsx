// landing page for our site

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Landing()
{
    return (
        <Container>
            <h1>JamR</h1>
            <Stack dir='horizontal'>
                <Button href='/register'>Sign up</Button>
                <Button href='/login'>Log in</Button>
            </Stack>
        </Container>
    );
};

export default Landing;