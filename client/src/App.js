import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//utils
import themeStyle from './utils/theme';
import AuthRoute from './utils/AuthRoute';
//pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import User from './pages/User';
//components
import Navbar from './components/Navbar';

//redux
import { connect } from 'react-redux';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/actionTypes';


axios.defaults.baseURL = 'http://localhost:5000/socio-6fc03/us-central1/api/';
const theme =  createMuiTheme(themeStyle)

const token = localStorage.FBIdToken;

/* main component */
const App = ({ dispatch, authenticated }) => {
  
  useEffect(() => {
    if(token) {
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 1000 < Date.now()) {
        dispatch(logoutUser())
        window.location.href = '/login';
      } else {
        dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        dispatch(getUserData());
      }
    }
  },[dispatch])

  return (
    <MuiThemeProvider theme={theme}>
      <Navbar authenticated={authenticated}/>
      <div className="container">
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/users/:handle' component={User}/>
          <Route exact path='/users/:handle/scream/:screamId' component={User}/>
          <AuthRoute exact path='/login' component={LoginPage} authenticated={authenticated}/>
          <AuthRoute exact path='/signup' component={SignupPage} authenticated={authenticated}/>
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  }
}

// App.propTypes = {
//   authenticated: PropTypes.bool.isRequired
// }

export default connect(mapStateToProps)(App);