import { Link } from "react-router-dom"
import { useAuth } from "../AuthContext"

const Home = () => {


const{isAuth} = useAuth();




    return (
        <>
        <div className="card">
        <h1>CRUD CO</h1>
        
        <Link to="/users/add">
        <button type="submit" className="button">sign-up</button></Link>
        <Link to="/login">
            <button type="submit" className="button">log-in</button>
        </Link>
        </div>
        <div className="card2">
            <div className="about-box">
                <h3>About</h3>
                    <p>CRUD co is a url shortening app. Enter any url and have it saved as a shorter easier url to remember and send to other people. </p>
            </div>
            <div className="about-box2">
                <h3>Profile</h3>
                    <p>make a profile to save your urls, create multiple urls for as many websites as you want.</p>

            </div>
        </div>

        {isAuth ? (
            <p>logged in</p>
        ) :(
            <p>not logged in</p>
        )}
        
        </>
    )
}

export default Home