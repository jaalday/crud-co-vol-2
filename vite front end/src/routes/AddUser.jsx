import {Form, redirect } from 'react-router-dom'



const AddUser = () => {

    return(

        <>
        <div className='card'>
        <Form method="post">
            <label>Email:
                <legend>
                    
                <input type="text" name="userName"/>
                </legend>
            </label>
            <br/>
            
            <label>Password:
                <legend>
                <input type="text"/>
                </legend>
            </label>
            <br/>
           
            <label>Confirm:
                <legend>
                <input type="text"/>
                </legend>
            </label>
            <br/>
            <br/>
            <button type="submit">Add User</button>


        </Form>
        </div>
        
        </>
    )
}

export default AddUser