// navigation bar for home and search

import { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import PFP from '../assets/fake_person.png';

function Navigation()
{

    return (
        <>
            <Navbar className='fixed-top border-bottom bg-body'>
                <Container>
                    <Navbar.Brand>JamR</Navbar.Brand>
                    <Form.Control type='search' id='searchBar' placeholder='Search'></Form.Control>
                    <Button variant='link'><Image src={PFP} className='float-right' style={{height: '40px'}} roundedCircle></Image></Button>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;