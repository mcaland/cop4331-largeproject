// this is used in search and on the main page to show people's profiles

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack  from 'react-bootstrap/Stack';


import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    name: string;
    experienceTags: string[];
    lookingforTags: string[];
    imageUrl: string;
    audioUrl: string;
  }


function Person(props: Props)
{


    function parseTags(e : string[])
    {
        let tagList : any[] = [];

        for (let i = 0; i < e.length; i++)
        {
            tagList.push(<Button style={{flex: '0 0 auto', }} key={i}>{e[i]}</Button>);
        }

        return tagList;
    }
    
    var imgPath = props.imageUrl;

    if (imgPath !== "")
    {
        imgPath = "http://localhost:3000/files/" + imgPath.split("files/")[1];
    }
    else
    {
        imgPath = "holder.js/200px200";
    }

    console.log(props.imageUrl);

    return (
    <Col>
        <Card style={{width: '20rem'}} data-bs-theme='dark'>
            <Card.Img variant='top' src={imgPath} />
            <Card.ImgOverlay className= "justify-content-flex-end" ><Button style={{width: '15%', borderRadius: 100, backgroundColor: 'grey'}}>&#9658;</Button></Card.ImgOverlay>
            <Card.Body>
                <Stack>
                    <Card.Title>
                        {props.name}
                    </Card.Title>
                    <Card.Text>
                        looking for:
                    </Card.Text>
                    <Stack direction='horizontal' style={{overflowX: "scroll", overflowY: 'hidden', width: '100%', display: 'flex', gap: '5px', paddingBottom: '5px'}}>
                        {parseTags(props.lookingforTags)}
                    </Stack>
                    <Card.Text>
                        skills:
                    </Card.Text>
                    <Stack direction='horizontal' style={{overflowX: "scroll", overflowY: 'hidden', width: '100%', display: 'flex', gap: '5px', paddingBottom: '5px'}}>
                        {parseTags(props.experienceTags)}
                    </Stack>
                    <Button>Interested</Button>
                </Stack>
            </Card.Body>
        </Card>
    </Col>);
};

export default Person;