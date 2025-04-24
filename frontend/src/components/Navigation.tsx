// navigation bar for home and search

import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import Person from '../components/Person';

function Navigation( { callback } )
{
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(_ud);
    var imgPath = ud.imageUrl;

    const [search, updateSearch] = React.useState('');
    const [results, updateResults] = React.useState<any[]>([]);

    async function handleSearch(e : any) : Promise<void>
    {
        if (window.location.href !== 'https://largeproject.maudxd.online/home')
        {
            return;
        }

        updateSearch(e.target.value);

        var obj = {keyword: e.target.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('https://largeproject.maudxd.online/api/auth/search', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                //updateErrorMessage(res.error);
            }
            else
            {
                var fullResults : any[] = [];

                for (let i = 0; i < res.length; i++)
                {
                    fullResults = [...fullResults, <Person name={res[i].displayName} experienceTags={res[i].skills} lookingforTags={res[i].lookingFor} imageUrl={res[i].imageUrl} audioUrl={res[i].audioUrl} key={i} />];
                }

                updateResults(fullResults);
                callback(fullResults);
            }
        }
        catch (error : any)
        {
            //updateErrorMessage(error.toString());
            return;
        }
    }

    if (imgPath !== "")
    {
        imgPath = "https://largeproject.maudxd.online/files/" + imgPath.split("files/")[1];
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
                <Container style={{gap: '20px'}}>
                    <Navbar.Brand><a href='/home' className='text-decoration-none'>JamR</a></Navbar.Brand>
                    <Form.Control type='search' id='searchBar' placeholder='Search' onChange={handleSearch}></Form.Control>
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