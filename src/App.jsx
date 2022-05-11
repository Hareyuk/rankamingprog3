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
import Surprise from './pages/Surprise/Surprise'
import './App.css';

function App() {
  return (
    <Fragment>
      <BackgroundD></BackgroundD>
        <div className='organize'>
          <BrowserRouter>
          <Header></Header>
          <div className='divDesign'>
            </div>
            <main>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/about' element={<About/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<SignUp/>}></Route>
              <Route path='/game/:id' element={<Game/>}></Route>
              <Route path='/games' element={<Games/>}></Route>
              <Route path='/rankings' element={<Rankings/>}></Route>
              <Route path='/profile/:id' element={<Profile/>}></Route>
              <Route path='/surprise/' element={<Surprise/>}></Route>
            </Routes>
            </main>
          </BrowserRouter>
        </div>
    </Fragment>
  );
}

export default App;
