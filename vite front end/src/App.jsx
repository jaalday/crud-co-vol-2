import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AddUser from './routes/AddUser'
import Profile from './routes/Profile'
import Layout from './components/Layout'
import Login from './routes/Login'


import './App.css'
import Home from './routes/Home'

const router = createBrowserRouter([
  {
  
  element:<Layout/>,
  children:[
  
    {
      path: '/create',
      element: <AddUser/>,

    },
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '/profile',
      element: <Profile/>,
    },
    {
      path: '/login',
      element: <Login/>,
    }

]
}
])









function App() {
  

  return <RouterProvider router={router}/>
}

export default App
