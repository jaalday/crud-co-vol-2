import PropTypes from "prop-types";
// import './App.css'
import {Link} from 'react-router-dom';




const Navigation = ({ navItems }) => {


  return (
    <>
     <nav>
   
        
       
        <div >
           
               
           
        <div className="nav-bar">
                {navItems.map((link, index) => {
                    return (<p className="nav-text" key={`${index}`}>
                        <Link to = {link.url}>{link.title}</Link>
                

                        </p> )
})}
          


          
        </div>

          
            
                
        </div>
        </nav>



    
    
    </>





  )





}
Navigation.propTypes= {
    navItems: PropTypes.array,
}

export default Navigation;