import handleChange from './Search.tsx';
import Person from "../components/Person";
import React from 'react';

async function ShowInterested()
{

    

    const [err, updateError] = React.useState('');

    function updateErrorMessage(e : string)
    {
        updateError(e);

    }

    

    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = '';
    var ud = JSON.parse(_ud);
    var interestedUsers = ud.interestedUsers;
    
    
    var obj = {keyword: interestedUsers};
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
                    interestedUsers: res.interestedUsers,
                    displayName: res.displayName,
                    skills: res.skills,
                    lookingFor: res.lookingFor,
                    imageUrl: res.imageUrl,
                    audioUrl: res.audioUrl
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


export default ShowInterested;