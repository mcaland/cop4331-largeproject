// this is used in search and on the main page to show people's profiles

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack  from 'react-bootstrap/Stack';

interface Props {
    name: string;
    experienceTags: string[];
    lookingforTags: string[];
    imageUrl: string;
    audioUrl: string;
  }


function Person({ name, experienceTags, lookingforTags, imageUrl, audioUrl, userID })
{
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(_ud);
    var userID = ud.userID;


    function parseTags(e : string[])
    {
        let tagList : any[] = [];

        for (let i = 0; i < e.length; i++)
        {
            tagList.push(<Button style={{flex: '0 0 auto', }} key={i}>{e[i]}</Button>);
        }

        return tagList;
    }
    
    var imgPath = imageUrl;

    if (imgPath !== "")
    {
        imgPath = "https://largeproject.maudxd.online/files/" + imgPath.split("files/")[1];
    }
    else
    {
        imgPath = "holder.js/200px200";
    }

    async function markInterested(e : any) : Promise<void>
    {
        var obj = {userId: userID, targetUserId: e};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('https://largeproject.maudxd.online/api/auth/interested', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                //updateErrorMessage(res.error);
            }
            else
            {
                console.log("success!");
                
            }
        }
        catch (error : any)
        {
            //updateErrorMessage(error.toString());
            return;
        }
    }

    return (
    <Col>
        <Card style={{width: '20rem'}} data-bs-theme='dark'>
            <Card.Img variant='top' src={imgPath} />
            <Card.ImgOverlay className= "justify-content-flex-end" ><Button style={{width: '15%', borderRadius: 100, backgroundColor: 'grey'}}>&#9658;</Button></Card.ImgOverlay>
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
                    <Button onClick={() => {markInterested(userID)}}>Interested</Button>
                </Stack>
            </Card.Body>
        </Card>
    </Col>);
};

export default Person;