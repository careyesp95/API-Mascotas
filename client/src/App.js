import './App.css';
import Section from './pages/Section';
import Home from './pages/Home';
import CreateDog from './pages/CreateDog';
import Nav from './components/Nav';
import DogDetail from './pages/DogDetail';
import HomeSearch from './pages/HomeSearch';
import {BrowserRouter,Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getDogs} from './actions/index';


function App() {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getDogs())
  },[dispatch])
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/'>
          <Section/>
        </Route>
        <Route path='/Home'>
          <Nav/>
        </Route>
        <Route exact path='/home'>
          <Home/>
        </Route>
        <Route exact path='/home/search'>
          <HomeSearch/>
        </Route>
        <Route exact path='/home/creardog'>
          <CreateDog />
        </Route>
        <Route exact path='/home/dogdetail/:id'>
          <DogDetail />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
