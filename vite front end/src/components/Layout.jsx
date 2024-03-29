import {Outlet, Form, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';


const primaryNav = [
   
    {title: 'Sign-up', url: '/users/add'},
    {title: 'Profile', url: '/profile'},
    {title: 'Log-in', url: '/login'},
    {title: 'LogOut', url:'/logout'},
    
]


const Layout =() => {

    return(

        <>
        
        <Navigation navItems={primaryNav}/>
       
     
      
        <Outlet/>
        
       
            
   
        </>
        



    )





}

export default Layout