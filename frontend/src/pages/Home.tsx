// site homepage

import Container from 'react-bootstrap/Container';

import Navigation from "../components/Navigation";
import Person from "../components/Person";

function Home()
{
    return (
    <>
        <Navigation />
        <Container>
            <Person />
            <Person />
            <Person />
        </Container>
    </>
    );
};

export default Home;