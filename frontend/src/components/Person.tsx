// this is used in search and on the main page to show people's profiles

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack  from 'react-bootstrap/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';




function Person({name, experienceTags, lookingforTags, imageUrl })
{
    import('./assets' + imageUrl).then(imageModule => {
        
      });

    function parseTags(e : string[])
    {
        let tagList : any[] = [];

        for (let i = 0; i < e.length; i++)
        {
            tagList.push(<Button style={{flex: '0 0 auto'}}>{e[i]}</Button>);
        }

        return tagList;
    }

    return (
    <Col>
        <Card style={{width: '20rem'}} data-bs-theme='dark'>
            <Card.Img variant='top' src={imageModule} />
            <Card.Body>
                <Stack>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Card.Text>
                        looking for:
                    </Card.Text>
                    <Stack direction='horizontal' style={{overflowX: "scroll", overflowY: 'hidden', width: '100%', display: 'flex', gap: '5px', paddingBottom: '5px'}}>
                        {parseTags(lookingforTags)}
                    </Stack>
                    <Card.Text>
                        skills:
                    </Card.Text>
                    <Stack direction='horizontal' style={{overflowX: "scroll", overflowY: 'hidden', width: '100%', display: 'flex', gap: '5px', paddingBottom: '5px'}}>
                        {parseTags(experienceTags)}
                    </Stack>
                    <Button>Interested</Button>
                </Stack>
            </Card.Body>
        </Card>
    </Col>);
};

export default Person;