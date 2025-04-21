// site homepage

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Navigation from "../components/Navigation";
import Person from "../components/Person";

function Home()
{
    return (
    <>
        <Navigation />
        <Container>
            <Tabs>
                <Tab eventKey='recommended' title='Recommended'>
                    <Container>
                        <Row>
                            <Person />
                            <Person />
                            <Person />
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey='interested' title='Interested'>
                    <Container>
                        <Row>
                            <Person />
                            <Person />
                            <Person />
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    </>
    );
};

export default Home;