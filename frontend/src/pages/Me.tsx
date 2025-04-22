// user's profile page

import Profile from '../components/Profile';
import Navigation from '../components/Navigation';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Me()
{


    return (
        <Container>
            <Navigation />
            <Profile />
            <Button>Edit profile</Button>
        </Container>
    );
};

export default Me;