// used to show a person's profile

import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import ExperienceForm from './ExperienceForm';

function EditProfile()
{
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(_ud);
    var userID = ud.userID;

    const [displayName, updateDisplayName] = React.useState(ud.displayName);
    const [experienceTags, updateExperienceTags] = React.useState([...ud.skills]);
    const [wantedTags, updateWantedTags] = React.useState([...ud.lookingFor]);
    const [imgPath, updateImgPath] = React.useState(ud.imageUrl);

    let relImgPath = imgPath;

    if (imgPath !== "")
    {
        relImgPath = "http://localhost:3000/files/" + imgPath.split("files/")[1];
    }
    else
    {
        relImgPath = "holder.js/200px200";
    }

    function handleDisplayNameChange(e : any)
    {
        updateDisplayName(e.target.value);
    }

    async function updateUserData()
    {
        var obj : any = { };

        if (displayName !== ud.displayName)
        {
            obj.displayName = displayName;
        }
        if (experienceTags !== ud.experience)
        {
            obj.skills = experienceTags;
        }
        if (wantedTags !== ud.wantedTags)
        {
            obj.lookingFor = wantedTags;
        }

        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(`http://localhost:5000/api/auth/edit/${userID}`, {method: 'PATCH', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                //updateErrorMessage(res.error);
            }
            else
            {
                ud.displayName = displayName;
                ud.skills = experienceTags;
                ud.lookingFor = wantedTags;
                ud.imageUrl = imgPath;

                localStorage.setItem('user_data', JSON.stringify(ud));

                window.location.href = "/me";
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

    return (
        <Form>
            <Container>
                <Row>
                    <Stack direction='horizontal' gap={4} className='align-items-end'>
                        <Image style={{height: '200px', width: '200px'}} src={relImgPath}/>
                        <FloatingLabel controlId='floatingName' label='Display name'>
                            <Form.Control type='text' placeholder='Display name' value={displayName} onChange={handleDisplayNameChange}></Form.Control>
                        </FloatingLabel>
                    </Stack>
                </Row>
                <Row>
                    <h3>Information</h3>
                </Row>
                <Row>
                    <h5>looking for:</h5>
                </Row>
                <Container style={{height: '20vh', paddingBottom: '3vh'}}>
                    <ExperienceForm data={wantedTags} callback={updateWantedTags} />
                </Container>
                <Row>
                    <h5>skills:</h5>
                </Row>
                <Container style={{height: '20vh', paddingBottom: '3vh'}}>
                    <ExperienceForm data={experienceTags} callback={updateExperienceTags} />
                </Container>
                <Button style={{width: '100%'}} onClick={updateUserData}>Save changes</Button>
            </Container>
        </Form>
    );
};

export default EditProfile;