import{
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Game from './pages/Game/Game';
import Games from './pages/Games/Games';
import Rankings from './pages/Rankings/Rankings';
import Profile from './pages/Profile/Profile';
import BackgroundD from './components/BackgroundCanvas/BackgroundD';
import { Fragment } from 'react';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <Fragment>
      <BackgroundD></BackgroundD>
        <div className='organize'>
          <Header></Header>
          <div className='content'>
            <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
