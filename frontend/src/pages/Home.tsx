// site homepage

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SearchOutput from '../components/SearchOutput.tsx'
import Col from 'react-bootstrap/Col';

import Navigation from "../components/Navigation";
import ShowInterested from '../components/ShowInterested.tsx';
import Person from "../components/Person";

function Home()
{
    return (
    <>
        <Navigation />
        <Container>
            <Tabs defaultActiveKey='recommended'>
                <Tab eventKey='recommended' title='Recommended'>
                    <Container>
                        <Row>
                            <SearchOutput />
                            <Col></Col>

                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey='interested' title='Interested'>
                    <Container>
                        <Row>
                            <ShowInterested />
                            <Col></Col>
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    </>
    );
};

export default Home;