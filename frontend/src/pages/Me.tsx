// user's profile page

import Profile from "../components/Profile";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Me()
{


    return (
        <Container>
            <Profile />
            <Button>Edit profile</Button>
        </Container>
    );
};

export default Me;