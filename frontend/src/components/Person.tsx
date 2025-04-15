// this is used in search and on the main page to show people's profiles

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

function Person()
{
    return (
    <Card style={{width: '14rem'}}>
        <Card.Img variant='top' src='../assets/react.svg' />
        <Card.Body>
            <Card.Text>
                Helllo!
            </Card.Text>
            <Card.Title>
                John Doe
            </Card.Title>
        </Card.Body>
    </Card>);
};

export default Person;