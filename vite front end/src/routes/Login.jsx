
import { Form, useLoaderData, Link, redirect } from "react-router-dom";


export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  const password = formData.get("password");

  const logindata = { email, password };

  try {
    const url = `${import.meta.env.VITE_SOURCE_URL}/login`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "content-Type": "application/json",
        },
        body: JSON.stringify(logindata),
    });
    //   .then((response) => response.json());
    //   console.log("logged in", login);

    //   return redirect("/profile");


    const statusCode = response.status;
    const data = await response.json();

    const {access_token} = data;

    localStorage.clear();
    localStorage.setItem('access_token', access_token);
    return statusCode === 200 ? true : false;
} catch (error) {
    console.error('error', error);
    return false;
}
  
  

}




const Login = () => {


return(
    <>
    <div className="card2">
        <h1>Log-in</h1>
        <Form id="login" method="POST">
        <label>
            <input type="text" name="email" placeholder="email"/>
            <br/>
            <br/>
            <input type="text" name="password" placeholder="password"/>
            <br/>
            <br/>
            <button type="submit" className="button">Log-in</button>
        </label>
        </Form>
    </div>
    
    
    
    </>

)


}


export default Login