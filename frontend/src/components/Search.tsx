// search implementation

import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';




function Search()
{
    const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(true);
    const [formData, setFormData] = useState({
      input: '',
    });
    

    const handleChange = (e : any) => {
        setSearchField(e.target.value);
        if(e.target.value===""){
          setSearchShow(false);
        }
        else {
          setSearchShow(true);
        }
        console.log('Form Data:', searchField);
      };



    return (
        <Form.Control className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
					type = "search"
					placeholder = "Search"
					onChange = {handleChange}></Form.Control>
    


    );
}

export default Search;
