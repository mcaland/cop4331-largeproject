// user's profile page

import Profile from '../components/Profile';
import Navigation from '../components/Navigation';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import EditProfile from '../components/EditProfile';

function Me()
{
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(ud);
    var id = ud.id;
    var displayName = ud.displayName;
    var experienceTags = ud.experienceTags;
    var wantedTags = ud.wantedTags;

    return (
        <Container>
            <Navigation />
            <Profile name={displayName} experience={experienceTags} lookingfor={wantedTags} />
            <Button style={{width: '100%'}}>Edit profile</Button>
        </Container>
    );
};

export default Me;