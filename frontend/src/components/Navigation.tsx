// navigation bar for home and search

import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function Navigation()
{
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(_ud);
    var imgPath = ud.imageUrl;

    if (imgPath !== "")
    {
        imgPath = "http://localhost:3000/files/" + imgPath.split("files/")[1];
    }
    else
    {
        imgPath = "holder.js/200px200";
    }

    function doLogout(event : any)
    {
        event.preventDefault();

        localStorage.removeItem('user_data');
        window.location.href = "/";
    }

    return (
        <>
            <Navbar className='navbar-fixed-top border-bottom bg-body'>
                <Container>
                    <Navbar.Brand><a href='/home' className='text-decoration-none'>JamR</a></Navbar.Brand>
                    <Form.Control type='search' id='searchBar' placeholder='Search'></Form.Control>
                    <Dropdown>
                        <Dropdown.Toggle variant='link'><Image src={imgPath} className='float-right' style={{height: '40px'}} id='PFP' roundedCircle></Image></Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href='/me' key={1}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={doLogout} key={2} className='btn btn-danger'>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;