import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
//MUI
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import TooltipButton from './TooltipButton';
import Typography from '@material-ui/core/Typography';
//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Paper } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/KeyboardReturn'
//redux
import { connect } from 'react-redux';
import { uploadImage } from '../redux/actions/userActions';
import { logoutUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {   
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& .button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: '100%',
            maxWidth: '100%', 
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

const Profile = ({ classes, user, dispatch }) => {

    const { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated } = user
    
    const handleImageChange = (e) => {
        const image = e.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image', image, image.name)
        dispatch(uploadImage(formData));
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageupload');
        fileInput.click();
    }

    const uiComponent = !loading 
        ? (authenticated 
            ? <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageupload" hidden onChange={handleImageChange}/>
                        <TooltipButton tip="Edit Profile Picture" 
                            onClick={handleEditPicture} 
                            tipClass="top"
                            btnClass="button">
                            <EditIcon color="primary"/>
                        </TooltipButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <>
                                <LocationOn color="primary"/>
                                <span>{location}</span>
                                <hr/>
                            </>
                        )}
                        {website && (
                            <>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </>
                        )}
                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div> 
                    <TooltipButton tip="Logout" onClick={() => dispatch(logoutUser())} tipClass="top">
                            <LogoutIcon color="primary"/>
                    </TooltipButton>
                    <EditDetails/>
                </div>
              </Paper>
            : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found, please login.
                        <div className={classes.buttons}>
                            <Button variant="contained" color="primary" component={Link} to='/login'>
                                    Login
                            </Button>
                            <Button variant="contained" color="secondary" component={Link} to='/signup'>
                                    Signup
                            </Button>
                        </div>
                    </Typography>
                </Paper>
            )
          )
        : (<p>Loading...</p>)

    return uiComponent;
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired 
}

const mapStateToProps = ({ user }) => {
    return {user};
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));