// used to show a person's profile

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import PFP from '../assets/fake_person.png';

function Profile({ name = "John Doe", experience = [], lookingfor = [] })
{
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
        <Container>
            <Row>
                <Stack direction='horizontal' gap={4} className='align-items-end'>
                    <Image style={{height: '200px', width: '200px'}} src={PFP}/>
                    <h1 className='text-start align-bottom fw-semibold'>{name}</h1>
                </Stack>
            </Row>
            <Row>
                <h3>Information</h3>
            </Row>
            <Row>
                <h5>looking for:</h5>
            </Row>
            <Stack direction='horizontal' style={{overflowX: 'auto', gap: '5px', paddingBottom: '5px'}}>
                {parseTags(lookingfor)}
            </Stack>
            <Row>
                <h5>skills:</h5>
            </Row>
            <Stack direction='horizontal' style={{overflowX: 'auto', gap: '5px', paddingBottom: '5px'}}>
                {parseTags(experience)}
            </Stack>
        </Container>
    );
};

export default Profile;