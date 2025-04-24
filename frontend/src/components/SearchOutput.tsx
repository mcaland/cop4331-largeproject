import React from 'react';

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import handleChange from './Search.tsx';
import Person from "../components/Person";

async function SearchOutput()
{

    

    const [err, updateError] = React.useState('');

    function updateErrorMessage(e : string)
    {
        updateError(e);

    }

    var obj = {keyword: handleChange};
    var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('https://largeproject.maudxd.online/api/auth/search', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                updateErrorMessage(res.error);
            }
            else
            {
                var users = {
                    displayName: res.displayName,
                    skills: res.skills,
                    lookingFor: res.lookingFor,
                    imageUrl: res.imageUrl,
                    audioUrl: res.audioUrl,
                    UserID: res.UserID
                };
                
                return(   
                    <Person 
                        {...users.displayName}
                        {...users.skills}
                        {...users.lookingFor}
                        {...users.imageUrl}
                        {...users.audioUrl}
                    />
                )
            }

        }
        catch (error : any)
        {
            updateErrorMessage(error.toString());
            return;
        }
           
}


export default SearchOutput;