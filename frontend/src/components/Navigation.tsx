// navigation bar for home and search

import { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';

import PFP from '../assets/fake_person.png';
import { OffcanvasBody } from 'react-bootstrap';

function Navigation()
{
    const [visible, setVisible] = useState(false);

    const closeMenu = () => setVisible(false);
    const openMenu = () => setVisible(true);

    return (
        <>
            <Navbar className='fixed-top border-bottom bg-dark'>
                <Container>
                    <Navbar.Brand>JamR</Navbar.Brand>
                    <Form.Control type='search' id='searchBar' placeholder='Search'></Form.Control>
                    <Button variant='link' onClick={openMenu}><Image src={PFP} className='float-right' style={{height: '40px'}} roundedCircle></Image></Button>
                </Container>
            </Navbar>
            <Offcanvas show={visible} onHide={closeMenu}>
                <Offcanvas.Body>
                    <p>My account</p>
                    <p>Logout</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Navigation;