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
    const max_pages = 3;
    const [current_page, setPage] = React.useState(1);

    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(_ud);
    var userID = ud.userID;

    React.useEffect(() => {updateUserData()}, [current_page])

    const [experienceTags, setExperienceTags] = React.useState(ud.skills); // stores experience tags
    const [lookingTags, setLookingTags] = React.useState(ud.lookingFor); // stores looking tags
    const [imgPath, setImagePath] = React.useState(ud.imageUrl);

    async function updateUserData()
    {
        var obj : any = { };

        if (experienceTags !== ud.experience)
        {
            obj.skills = experienceTags;
        }
        if (lookingTags !== ud.wantedTags)
        {
            obj.lookingFor = lookingTags;
        }

        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(`http://largeproject.maudxd.online/api/auth/edit/${userID}`, {method: 'PATCH', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                //updateErrorMessage(res.error);
            }
            else
            {
                ud.skills = experienceTags;
                ud.lookingFor = lookingTags;
                ud.imageUrl = imgPath;

                localStorage.setItem('user_data', JSON.stringify(ud));
                
                if (current_page == 4)
                {
                    window.location.href = '/home';
                }

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

        formData.append("userID", userID);
        formData.append(userID + "." + file.name.split(".")[1], file);

        try
        {
            const response = await fetch('http://localhost:5000/api/auth/imageUpload',
                {
                    method: 'POST',
                    body: formData
                });
    
            var res = JSON.parse(await response.json());

            setImagePath(res.path);
        }
        catch (err)
        {

        }
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

    function getPageButton(e : number)
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
                    <Button onClick={() => {setPage(current_page + 1)}}>Finish</Button>
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
                        {getPageButton(current_page)}
                    </Stack>
                </Container>
            </Card.Body>
        </Card>
    );
};

export default ProfileSetup;