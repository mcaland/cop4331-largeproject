// used to show a person's profile

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import PFP from '../assets/fake_person.png';
import ExperienceForm from './ExperienceForm';

function EditProfile()
{

    return (
        <Form>
            <Container>
                <Row>
                    <Stack direction='horizontal' gap={4} className='align-items-end'>
                        <Image style={{height: '200px', width: '200px'}} src={PFP}/>
                        <Form.Control type='text' placeholder='Display name' value={'John Doe'}></Form.Control>
                    </Stack>
                </Row>
                <Row>
                    <h3>Information</h3>
                </Row>
                <Row>
                    <h5>looking for:</h5>
                </Row>
                <Container style={{height: '20vh', paddingBottom: '3vh'}}>
                    <ExperienceForm />
                </Container>
                <Row>
                    <h5>skills:</h5>
                </Row>
                <Container style={{height: '20vh', paddingBottom: '3vh'}}>
                    <ExperienceForm />
                </Container>
                <Button style={{width: '100%'}}>Save changes</Button>
            </Container>
        </Form>
    );
};

export default EditProfile;