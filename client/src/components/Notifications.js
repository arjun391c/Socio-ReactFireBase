import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
//MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//redux
import { connect } from 'react-redux';
import { markNotifRead } from '../redux/actions/userActions';

const Notifications = ({ dispatch, notifications }) => {
    const [state, setState] = useState({
        anchorEl: null
    })

    const { anchorEl } = state;

    let notifIcon; 

    if(notifications && notifications.length > 0) {
        notifications.filter(n => n.read === false).length > 0 
            ? (notifIcon = (<Badge badgeContent={notifications.filter(n => n.read === false).length} 
                                color="secondary">
                                    <NotificationsIcon/>
                                </Badge>))
            : (
                notifIcon = <NotificationsIcon/>
            )
    }
    else  {
        notifIcon = <NotificationsIcon/>
    }
    dayjs.extend(relativeTime);

    const handleOpen = (e) => {
        setState({ ...state, anchorEl: e.target })
    }

    const handleClose = () => {
        setState({ ...state, anchorEl: null })
    }

    const onMenuOpened = () => {
        let unreadNotIds = notifications.filter(n => !n.read)
                        .map(n => n.notificationId);
        dispatch(markNotifRead(unreadNotIds))  
    }
    return (
        <>
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}
                    >
                        {notifIcon}
                    </IconButton>
            </Tooltip>
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onEntered={onMenuOpened}
            >
                {notifications && notifications.length > 0
                ?   (notifications.map(n => {
                    const verb = n.type === 'like' ? 'liked' : 'commented on'
                    const time = dayjs(n.createdAt).fromNow();
                    const iconColor = n.read ? 'primary' : 'secondary';
                    const icon = n.type === 'like' ? (
                        <FavIcon color={iconColor} style={{marginRight: 10}}/>
                    ) : ( <ChatIcon color={iconColor}style={{marginRight: 10}}/> )
                    return (
                        <MenuItem key={n.createdAt} onClick={handleClose}>
                            {icon}
                            <Typography 
                                component={Link}
                                color="default"
                                variant="body1"
                                to={`/users/${n.recipent}/scream/${n.screamId}`}>
                                    {n.sender} {verb} your scream {time} 
                                </Typography>
                        </MenuItem>
                    )
                }))
                : (
                    <MenuItem onClick={handleClose}>
                        You have not notifications yet!
                    </MenuItem>
                )}
            </Menu>
        </>
    )
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})
export default connect(mapStateToProps)(Notifications)
