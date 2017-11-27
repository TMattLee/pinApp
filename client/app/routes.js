import Base from './components/Base/Base.jsx';
import Logout from './components/Logout/Logout.jsx'
import HomePage from './containers/HomePage/HomePage.jsx';
import Dashboard from './containers/Dashboard/Dashboard.jsx';
import Wall from './containers/Wall/Wall.jsx';


const routes = [
  {
    component: Base,
    routes:[
      {
        path: '/pinterest-app/',
        exact: true,
        component: HomePage
      },
      {
        path: '/pinterest-app/dashboard',
        component: Dashboard
      },
      {
        path: '/pinterest-app/wall/:userId',
        exact: true,
        component: Wall
      },
      {
        path: '/pinterest-app/logout',
        component: Logout
      },
    ]
  }
]

export default routes;