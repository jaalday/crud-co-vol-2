import { Link } from "react-router-dom"


const Login = () => {


return(
    <>
    <div className="card">
        <h1>Log-in</h1>
        <label>
            <input type="text" placeholder="email"/>
            <br/>
            <br/>
            <input type="text" placeholder="password"/>
            <br/>
            <br/>
            <button type="submit" className="button">Log-in</button>
        </label>

    </div>
    
    
    </>

)


}


export default Login