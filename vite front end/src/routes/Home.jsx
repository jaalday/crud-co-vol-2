import { Link } from "react-router-dom"


const Home = () => {






    return (
        <>
        <div className="card">
        <h1>CRUD CO</h1>
        <h3>url shortener</h3>
        <Link to="/create">
        <button type="submit" className="button">sign-up</button></Link>
        <Link to="/login">
            <button type="submit" className="button">log-in</button>
        </Link>
        </div>
        
        </>
    )
}

export default Home