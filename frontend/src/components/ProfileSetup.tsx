// first-time setup for a profile

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ProfileSetup()
{
    let experienceElements = [];
    const max_pages = 3;
    const current_page = 1;

    function returnPage(e : number)
    {
        if (e == 1)
        {
            return (
                <>
                    <Form.Group style={{paddingBottom: '20px'}}>
                        <Form.Label>Profile Photo</Form.Label>
                        <Form.Control type='file' required name='file' onChange={handlePhotoUpload} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile Audio</Form.Label>
                        <Form.Control type='file' name='file' onChange={handlePhotoUpload} />
                    </Form.Group>
                </>
            );
        }
        else if (e == 2)
        {
            return (
                <>
                    <h5 className='text-muted'>Who are you?</h5>
                    <Form.Group style={{paddingBottom: '20px'}}>
                        <Form.Label>Profile Photo</Form.Label>
                        <Form.Control type='file' required name='file' onChange={handlePhotoUpload} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile Audio</Form.Label>
                        <Form.Control type='file' name='file' onChange={handlePhotoUpload} />
                    </Form.Group>
                </>
            );
        }
        
    };

    function handlePhotoUpload(e : any)
    {

    }

    return (
        <Card>
            <Container style={{paddingTop: '20px'}}>
                <Card.Title>Hey! Let's get to know you more.</Card.Title>
            </Container>
            <Container style={{padding: '20px'}}>
                {returnPage(2)}
            </Container>
            <Container>
                <Stack direction='horizontal' gap={2}>
                    <Button>Back</Button>
                    <ProgressBar className='me-auto' style={{width: '100%'}} now={100* (current_page/max_pages)} label={`${Math.round(100 * (current_page / max_pages))}%`}></ProgressBar>
                    <Button>Next</Button>
                </Stack>
            </Container>
        </Card>
    );
};

export default ProfileSetup;