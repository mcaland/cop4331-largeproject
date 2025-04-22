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
    let experienceElements = [];
    const max_pages = 3;
    const [current_page, setPage] = React.useState(1);

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
                    <ExperienceForm />
                </>
            );
        }
        else if (e == 3)
        {
            return (
                <>
                    <h5 className='text-muted'>Who are you looking for?</h5>
                    <ExperienceForm />
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

    function handlePhotoUpload(e : any)
    {

    }

    return (
        <Card key={current_page} style={{height: '50vh'}}>
            <Card.Body className='d-flex flex-column'>
                <Container style={{paddingTop: '20px'}}>
                    <Card.Title>Hey! Let's get to know you more.</Card.Title>
                </Container>
                <Container style={{padding: '20px'}} className='bg-black'>
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