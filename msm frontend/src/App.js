import logo from './logo.svg';
import './App.css';
import './components/Landing_page/Landing_page'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import LandingPage from './components/Landing_page/Landing_page';
import ClientSearchPage from  './components/ClinetSearhPage/ClientSearchPage'
import Login from './components/Login/Login'
import SignUp1 from './components/SignUp_1/SignUp_1';
import SignUpAsWorker from './components/SignUpAsWorker/SignUpAsWorker';
import UserProfile from './components/UserProfile/UserProfile'
import ViewSearchedUserProfile from './components/UserProfile/ViewSearchedUserProfile';
import ViewProfile from './components/UserProfile/ViewProfile';
import { useState } from 'react';
import SignUpAsClient from './components/SignUpAsClient/SignUpAsClient';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ClientSearchResult from './components/Client/ClientSearchResult/SearchResult';
import ClientHirePage from './components/Client/ClientHirePage/HirePage';
import WorkersRequestPage from './components/Worker/WorkerRequestPage/WorkerRequestPage';
import WorkersWorkPage from './components/Worker/WorkerWorkPage/WorkerWorkPage';
function App() {
  const [user,setUser]=useState("f@gmail.com")
  const [searchedLocation,setSearchedLocation]=useState("PaikPara, B.Baria")
  return (
    
    <div className="App">
      <div id="body">
      <Router>
        <Routes>
          
        <Route path="/" exact element={<LandingPage/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/search" exact element={<ClientSearchPage/>}/>
        <Route path="/profile" exact element={<UserProfile/>}/>
        <Route path="/viewsearchedprofile/:user_email/:searchedLocation" exact element={<ViewSearchedUserProfile user_email={user} searchedLocation={searchedLocation}/>}/>
        <Route path="/viewprofile/:email/:status" exact element={<ViewProfile/>}/>
        <Route path="/signup1" exact element={<SignUp1/>}/>
        <Route path="/signup2" exact element={<SignUpAsWorker/>}/>
        <Route path="/signup3" exact element={<SignUpAsClient/>}/>
        <Route path="/resetpassword" exact element={<ResetPassword/>}/>\
        <Route path="/hires/:option" exact element={<ClientHirePage/>}/>
        <Route path="/requests/:option" exact element={<WorkersRequestPage/>}/>
        <Route path="/services/:option" exact element={<WorkersWorkPage/>}/>
        <Route path="/searched/:latitude/:longitude/:service/:location" exact element={<ClientSearchResult/>}/>
          
        </Routes>
      </Router>
      </div>
    </div>

  );
}

export default App;
