// this is used in search and on the main page to show people's profiles

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack  from 'react-bootstrap/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../assets/fake_person.png';


function Person()
{
    return (
    <Col>
        <Card style={{width: '20rem'}} data-bs-theme='dark'>
            <Card.Img variant='top' src={Image} />
            <Card.Body>
                <Stack>
                    <Card.Title>
                        John Doe
                    </Card.Title>
                    <Card.Text>
                        looking for:
                    </Card.Text>
                    <Stack direction='horizontal' style={{overflowX: "scroll", overflowY: 'hidden', width: '100%', display: 'flex', gap: '5px', paddingBottom: '5px'}}>
                        <Button style={{flex: '0 0 auto'}}>guitarist</Button>
                        <Button style={{flex: '0 0 auto'}}>drummer</Button>
                        <Button style={{flex: '0 0 auto'}}>guitarist</Button>
                        <Button style={{flex: '0 0 auto'}}>drummer</Button>
                        <Button style={{flex: '0 0 auto'}}>guitarist</Button>
                        <Button style={{flex: '0 0 auto'}}>drummer</Button>
                    </Stack>
                    <Card.Text>
                        skills:
                    </Card.Text>
                    <Stack direction='horizontal' style={{overflowX: "scroll", overflowY: 'hidden', width: '100%', display: 'flex', gap: '5px', paddingBottom: '5px'}}>
                        <Button style={{flex: '0 0 auto'}}>guitar 3 years</Button>
                        <Button style={{flex: '0 0 auto'}}>drums 1 year</Button>
                    </Stack>
                    <Button>Interested</Button>
                </Stack>
            </Card.Body>
        </Card>
    </Col>);
};

export default Person;