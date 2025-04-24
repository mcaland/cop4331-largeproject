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

async function SearchOutput()
{
    var obj = {keyword: handleChange};
    var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('http://localhost:5000/api/auth/search', {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error != null)
            {
                updateErrorMessage(res.error);
            }
        }

    finally {return(
        <Person />
    )}
}

export default SearchOutput;