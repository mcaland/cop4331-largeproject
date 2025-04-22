// navigation bar for home and search

import useState from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import PFP from '../assets/fake_person.png';

function Navigation()
{

    function Logout()
    {
        window.location.href = "/";
    }

    return (
        <>
            <Navbar className='fixed-top border-bottom bg-body'>
                <Container>
                    <Navbar.Brand><Button variant='link' href='/home' className='text-reset text-decoration-none'>JamR</Button></Navbar.Brand>
                    <Form.Control type='search' id='searchBar' placeholder='Search'></Form.Control>
                    <Dropdown>
                        <Dropdown.Toggle variant='link'><Image src={PFP} className='float-right' style={{height: '40px'}} id='PFP' roundedCircle></Image></Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href='/me' key={1}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={Logout} key={2} className='btn btn-danger'>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;