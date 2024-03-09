import { Form, redirect } from "react-router-dom"

export async function action({request}){

    const formData = await request.formData();
    const user_id = formData.get('user_id');
    const title = formData.get('title');
    const original_url = formData.get('original_url');
    const short_url = formData.get('short_url')

    const data = {user_id, title, original_url, short_url}

    const url = "http://localhost:8000/links/add";


    const addLinks = await fetch(url, {
        method: 'POST',
        headers:{
            'content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(data),

    }).then(response => response.json())
    console.log('added links', addLinks);

    return redirect('/profile')

}

const AddLinks = ()=>{


    return(

        <>
        <Form method="POST">
            <label>
                <input type="text" name="user_id" placeholder="user_id"/>

                <input type="text"  name="title" placeholder="title"/>
                <input type="text" name="original_url" placeholder="og - url"/>
                
                <input type="hidden" name="short_url" value=""/>
            </label>

            <button type="submit">Add</button>

        </Form>
        
        </>
    )

}


export default AddLinks