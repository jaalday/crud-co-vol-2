import { Form, useLoaderData, Link, redirect } from "react-router-dom";
// import {HTTPException} from 'fastapi';

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("userName");

  const password = formData.get("password");

  const data = { username, password };
  const url = "http://127.0.0.1:8000/users/add";

  const addUser = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  console.log("added user", addUser);

  return redirect("/profile");
}

const AddUser = () => {
  return (
    <>
      <div className="card">
        <Form id="addUser" method="POST">
          <label>
            Email:
            <legend>
              <input type="text" name="userName" />
            </legend>
          </label>
          <br />

          <label>
            Password:
            <legend>
              <input type="text" name="password" />
            </legend>
          </label>
          <br />
          {/* 
          <label>
            Confirm:
            <legend>
              <input type="text" />
            </legend>
          </label>
          <br />
          <br /> */}
          <button className="button" type="submit">
            Add User
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
