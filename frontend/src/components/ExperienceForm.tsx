// form for experience to be used on setup and edit profile

import React from 'react';

import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ExperienceForm()
{
    const [experienceElements, setExperienceElements] = React.useState<any[]>([]);
    const [skills, setSkills] = React.useState<string[]>([]);

    let target : string = '';

    React.useEffect(() => {generateList();}, [skills]);

    const experienceList = [
        'Event Organizer', 
        'Voice',
        'Bass',
        'Guitar',
        'Ukelele',
        'Piano/Keyboard',
        'Drums',
        'Percussion',
        'Tuba',
        'Saxophone',
        'Trumpet',
        'Accordion',
        'Bassoon',
        'Oboe',
        'Flute',
        'Harmonica',];

    // add to list
    const handleSelected = (e : any) =>
    {
        for (let i = 0; i < experienceElements.length; i++)
        {
            if (skills[i] == experienceList[e])
            {
                return;
            }
        }
        
        setSkills([...skills, experienceList[e]]);
    }

    // delete from list
    const handleDelete = () =>
    {
        let skillsRef = Object.assign([], skills);
        let i = skills.indexOf(target);

        if (i < 0)
        {
            return;
        }

        skillsRef.splice(i, 1);
        setSkills(skillsRef);
    }
    
    // makes a new list of elements every time this is called, after setSkills
    // this is done because if they aren't replaced every time the skills are changed,
    // the functions will have the wrong state
    function generateList()
    {
        let elementArr = [];

        for (let i = 0; i < skills.length; i++)
        {
            elementArr.push(experienceItem(skills[i], i));
        }

        setExperienceElements(elementArr);
    }

    // generates dropdown list of instruments/skills
    function dropdownList()
    {
        let dropList = [];

        for (let i = 0; i < experienceList.length; i++)
        {
            dropList.push(<Dropdown.Item eventKey={i} key={i}>{experienceList[i]}</Dropdown.Item>);
        }

        return (
            dropList
        );
    }

    // returns a unique item for the experience list
    function experienceItem(e : any, ind : number)
    {
        return (
            <ListGroup.Item key={ind} id={e}>
                <Stack direction='horizontal'>
                    <h6 style={{width: '500%'}}>{e}</h6>
                    <Form.Control type='number' placeholder='0'/>
                    <Button variant='danger' key={skills[0]} onClick={() => {target = e; handleDelete()}}>Delete</Button>
                </Stack>
            </ListGroup.Item>
        );
    }

    return (
        <Container className=''>
            <Dropdown onSelect={handleSelected} key={experienceElements[0]}>
                <Dropdown.Toggle id='experience-dropdown'>
                    Add Experience
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {dropdownList()}
                </Dropdown.Menu>
            </Dropdown>

            <ListGroup style={{marginTop: '30px', overflowY: 'auto'}} className='border bg-danger' id="experienceList">
                {experienceElements}
            </ListGroup>
        </Container>

    );
}

export default ExperienceForm;