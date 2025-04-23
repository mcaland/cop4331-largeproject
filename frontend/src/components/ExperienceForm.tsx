// form for experience to be used on setup and edit profile

import React from 'react';

import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ExperienceForm({ data, callback })
{
    const [newData, updateData] = React.useState(data);
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
        
        callback([...data, experienceList[e]]);
        updateData([...newData, experienceList[e]]);
        setSkills([...skills, experienceList[e]]);
    }

    // delete from list
    const handleDelete = () =>
    {
        let skillsRef = Object.assign([], skills);

        let i;

        for (i = 0; i < skills.length; i++)
        {
            if (skills[i].includes(target))
            {
                break;
            }
        }

        if (i >= skills.length)
        {
            return;
        }

        skillsRef.splice(i, 1);
        setSkills(skillsRef);
        newData.splice(i, 1);
        updateData(skillsRef);
        data.splice(i, 1);
        callback(skillsRef);
    }

    function parseData()
    {
        if (skills.length > 0)
        {
            return;
        }

        for (let i = 0; i < data.length; i++)
        {
            setSkills([...skills, newData[i]]);
        }
    }

    function updateYrsExperience(e : any)
    {
        let skillsRef : string[] = Object.assign([], skills);

        for (let i = 0; i < skills.length; i++)
        {
            if (skills[i].includes(e.target.id))
            {
                if (e.target.value == 0)
                {
                    skillsRef[i] = e.target.id;
                    data[i] = e.target.id;
                    newData[i] = e.target.id;
                }
                else
                {
                    skillsRef[i] = e.target.id + " " + e.target.value.toString() + "y";
                    data[i] = e.target.id + " " + e.target.value.toString() + "y";
                    newData[i] = e.target.id + " " + e.target.value.toString() + "y";
                }
            }
        }

        setSkills(skillsRef);
        updateData(newData);
        callback(data);
    }
    
    // makes a new list of elements every time this is called, after setSkills
    // this is done because if they aren't replaced every time the skills are changed,
    // the functions will have the wrong state
    function generateList()
    {
        let elementArr = [];

        for (let i = 0; i < skills.length; i++)
        {
            if (skills[i].split(' ').length > 1) // we have yrs experience
            {
                elementArr.push(experienceItem(skills[i].split(' ')[0], i, parseInt(skills[i].split(' ')[1].split('y')[0])));
            }
            else
            {
                elementArr.push(experienceItem(skills[i], i));
            }
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
    function experienceItem(e : any, ind : number, yrs : number = -1)
    {
        let spinboxComponent;

        if (yrs < 0) // no data for years
        {
            spinboxComponent = <Form.Control type='number' id={e} placeholder='0' min={0} value={0} onChange={updateYrsExperience} />;
        }
        else
        {
            spinboxComponent = <Form.Control type='number' id={e} placeholder='0' min={0} value={yrs} onChange={updateYrsExperience}/>
        }

        return (
            <ListGroup.Item key={ind}>
                <Stack direction='horizontal'>
                    <h6 style={{width: '500%'}}>{e}</h6>
                    {spinboxComponent}
                    <Button variant='danger' key={skills[0]} onClick={() => {target = e; handleDelete()}}>Delete</Button>
                </Stack>
            </ListGroup.Item>
        );
    }

    parseData();

    return (
        <Container style={{height: '100%'}} className='d-flex flex-column'>
            <Dropdown onSelect={handleSelected} key={experienceElements[0]}>
                <Dropdown.Toggle id='experience-dropdown'>
                    Add Experience
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {dropdownList()}
                </Dropdown.Menu>
            </Dropdown>

            <ListGroup style={{marginTop: '30px', overflowY: 'auto', height: '1px'}} className='border flex-grow-1 overflow-auto' id="experienceList">
                {experienceElements}
            </ListGroup>
        </Container>

    );
}

export default ExperienceForm;