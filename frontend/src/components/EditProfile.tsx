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

    const [fileTargetEvent, updateFileTargetEvent] = React.useState<any>(null);

    const [displayName, updateDisplayName] = React.useState(ud.displayName);
    const [experienceTags, updateExperienceTags] = React.useState([...ud.skills]);
    const [wantedTags, updateWantedTags] = React.useState([...ud.lookingFor]);
    const [imgPath, updateImgPath] = React.useState(ud.imageUrl);

    const imgFile = React.useRef<HTMLInputElement | null>(null);

    const [relImgPath, updateRelImgPath] = React.useState(getRelativePath(imgPath));

    function getRelativePath(fullPath : string)
    {
        if (fullPath !== "" && fullPath !== "holder.js/200px200")
        {
            return ("https://largeproject.maudxd.online/files/" + fullPath.split("files/")[1]);
        }
        else
        {
            return ("holder.js/200px200");
        }
    }

    function handleDisplayNameChange(e : any)
    {
        updateDisplayName(e.target.value);
    }

    function promptImgFile()
    {
        if (imgFile != null)
        {
            imgFile.current?.click();
        }
    }

    function emptyImgFile()
    {
        updateImgPath("");

        updateRelImgPath("holder.js/200px200");
    }

    const uploadTempImg = async (e : any) =>
    {
        updateFileTargetEvent(e);

        if (e == null)
        {
            return;
        }

        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("userID", userID);
        formData.append(userID + "_t." + file.name.split(".")[1], file);

        try
        {
            const response = await fetch('https://largeproject.maudxd.online/api/auth/imageUpload',
                {
                    method: 'POST',
                    body: formData
                });
                
            var res = JSON.parse(await response.text());

            updateImgPath(res.path);

            console.log(res.path);

            if (res.path !== "")
            {
                
                updateRelImgPath("http://https://largeproject.maudxd.online/files/" + res.path.split("files/")[1]);
            }
            else
            {
                updateRelImgPath("holder.js/200px200");
            }
        }
        catch (err)
        {
            console.log(err);
        }
    } 

    const uploadImage = async () =>
    {
        if (fileTargetEvent == null)
        {
            return;
        }

        const file = fileTargetEvent.target.files[0];
        const formData = new FormData();

        formData.append("userID", userID);
        formData.append(userID + "." + file.name.split(".")[1], file);

        try
        {
            const response = await fetch('https://largeproject.maudxd.online/api/auth/imageUpload',
                {
                    method: 'POST',
                    body: formData
                });
    
            var res = JSON.parse(await response.json());

            imgPath(res.path);

            if (res.path !== "")
            {
                updateRelImgPath("https://largeproject.maudxd.online/files/" + res.path.split("files/")[1]);
            }
            else
            {
                updateRelImgPath("holder.js/200px200");
            }
        }
        catch (err)
        {

        }
    }

    async function updateUserData()
    {
        var obj : any = { };

        uploadImage();

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
            const response = await fetch(`https://largeproject.maudxd.online/api/auth/edit/${userID}`, {method: 'PATCH', body: js, headers: {'Content-Type': 'application/json'}});

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
        <Form style={{width: '100%'}}>
            <Container>
                <Row>
                    <Stack direction='horizontal' gap={4} className='align-items-end'>
                        <Stack style={{maxWidth: '200px'}}>
                            <Image style={{height: '200px', width: '200px'}} src={relImgPath}/>
                            <Stack direction='horizontal' gap={4}>
                                <Button onClick={promptImgFile}>Change</Button>
                                <input type='file' id='photoUpload' ref={imgFile} style={{display: 'none'}} onChange={uploadTempImg} />
                                <Button variant='danger' onClick={emptyImgFile}>Remove</Button>
                            </Stack>
                        </Stack>
                        <FloatingLabel controlId='floatingName' label='Display name' style={{width: '100%'}}>
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