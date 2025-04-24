// site homepage

import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Search from '../components/Search.tsx'
import Col from 'react-bootstrap/Col';

import Navigation from "../components/Navigation";
import ShowInterested from '../components/ShowInterested.tsx';
import Person from "../components/Person";

function Home()
{
    const [searchResults, updateResults] = React.useState<any>([]);

    return (
    <>
        <Navigation callback={updateResults} />
        <Container>
            <Tabs defaultActiveKey='recommended'>
                <Tab eventKey='recommended' title='Recommended'>
                    <Container>
                        <Row>
                            {searchResults}
                            <Col>
                                
                            </Col>

                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey='interested' title='Interested'>
                    <Container>
                        <Row>
                            {searchResults}
                            <Col>
                                
                            </Col>
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    </>
    );
};

export default Home;