// first-time setup for a profile

import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ExperienceForm from './ExperienceForm';

function ProfileSetup()
{
    const [experienceTags, setExperienceTags] = React.useState([]); // stores experience tags
    const [lookingTags, setLookingTags] = React.useState([]); // stores looking tags
    let files = []; // stores files
    const max_pages = 3;
    const [current_page, setPage] = React.useState(1);

    React.useEffect(() => {handleExperienceTags();}, [experienceTags]);

    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(_ud);
    var id = ud.userID;

    async function handleExperienceTags() : Promise<void>
    {
        var obj = { userID: id, skills: experienceTags };
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('http://localhost:5000/api/auth/updateUser', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                //updateErrorMessage(res.error);
            }
            else
            {
                //updateAlert(<Alert variant='success'>{res.message}</Alert>);
                
                // TODO: update cookies
            }
        }
        catch (error : any)
        {
            //updateErrorMessage(error.toString());
            return;
        }
    }

    const handlePhotoUpload = async (e : any) =>
    {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("userID", id);
        formData.append(id + "." + file.name.split(".")[1], file);
        
        const response = await fetch('http://localhost:5000/api/auth/imageUpload',
            {
                method: 'POST',
                body: formData
            });

        const json = await response.json();

        console.log(json);
    }

    const handleAudioUpload = async (e : any) =>
    {
        const file = e.target.files[0];
        const formData = new FormData();

        //const response = await fetch();

        //formData.append(file.);
    }

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
                        <Form.Control type='file' name='file' onChange={handleAudioUpload} />
                    </Form.Group>
                </>
            );
        }
        else if (e == 2)
        {
            return (
                <>
                    <h5 className='text-muted'>Who are you?</h5>
                    <ExperienceForm data={experienceTags} callback={setExperienceTags} />
                </>
            );
        }
        else if (e == 3)
        {
            return (
                <>
                    <h5 className='text-muted'>Who are you looking for?</h5>
                    <ExperienceForm data={lookingTags} callback={setLookingTags} />
                </>
            );
        }
        
    };

    function getPageButtom(e : number)
    {
        if (e == 1)
        {
            return (
                <>
                    <Button disabled>Back</Button>
                    <ProgressBar className='me-auto' style={{width: '100%'}} now={100* (current_page/max_pages)} label={`${Math.round(100 * (current_page / max_pages))}%`}></ProgressBar>
                    <Button onClick={() => {setPage(current_page + 1)}}>Next</Button>
                </>
            );
        }
        else if (e == 2)
        {
            return (
                <>
                    <Button onClick={() => {setPage(current_page - 1)}}>Back</Button>
                    <ProgressBar className='me-auto' style={{width: '100%'}} now={100* (current_page/max_pages)} label={`${Math.round(100 * (current_page / max_pages))}%`}></ProgressBar>
                    <Button onClick={() => {setPage(current_page + 1)}}>Next</Button>
                </>
            );
        }
        else if (e == 3)
        {
            return (
                <>
                    <Button onClick={() => {setPage(current_page - 1)}}>Back</Button>
                    <ProgressBar className='me-auto' style={{width: '100%'}} now={100* (current_page/max_pages)} label={`${Math.round(100 * (current_page / max_pages))}%`}></ProgressBar>
                    <Button href='/home'>Finish</Button>
                </>
            );
        }
    }

    return (
        <Card key={current_page} style={{height: '50vh'}}>
            <Card.Body className='d-flex flex-column'>
                <Container style={{paddingTop: '20px'}}>
                    <Card.Title>Hey! Let's get to know you more.</Card.Title>
                </Container>
                <Container style={{padding: '20px', height: '100%', marginBottom: '2vh'}} className=''>
                    {returnPage(current_page)}
                </Container>
                <Container className='mt-auto'>
                    <Stack direction='horizontal' gap={2}>
                        {getPageButtom(current_page)}
                    </Stack>
                </Container>
            </Card.Body>
        </Card>
    );
};

export default ProfileSetup;