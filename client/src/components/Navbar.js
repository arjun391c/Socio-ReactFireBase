import React from 'react';
import AddScream from './AddScream';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from './Notifications';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TooltipButton from './TooltipButton';
//icon
import HomeIcon from '@material-ui/icons/Home';

const Navbar = ({ authenticated }) =>  {
    return (
        <AppBar>
            <Toolbar className="nav-container">
                <Link to='/'>
                    <TooltipButton tip="Home">
                        <HomeIcon color="primary"/>
                    </TooltipButton>
                </Link>
                {authenticated
                ? <>
                    <AddScream/>
                    <Notifications/>
                  </>
                : <>     
                    <Button color='inherit' component={Link} to='/login'>Login</Button>
                    <Button color='inherit' component={Link} to='/signup'>SignUp</Button>
                  </>
                }
            </Toolbar>
        </AppBar>
    )
}

export default connect()(Navbar);