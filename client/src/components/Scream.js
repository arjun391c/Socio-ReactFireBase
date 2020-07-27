import React from 'react'
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeleteScream from './DeleteScream';
import ScreamDialogue from './ScreamDialogue';
import LikeScream from './LikeScream';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TooltipButton from './TooltipButton';
//icon
import ChatIcon from '@material-ui/icons/Chat'; 
//redux
import { connect } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        width: 200,
        height: 200,
        objectFit: 'cover',
    },
    content: {
        padding: 25
    }
}

const Scream = ( props ) => { 
    const { classes, 
        user: { authenticated, credentials: { handle } }, 
        scream: { body, createdAt, userHandle, screamId, userImg, likeCount, commentCount } } = props;
    dayjs.extend(relativeTime);
    
    const deleteButton = authenticated && userHandle === handle 
        ? (
           <DeleteScream screamId={screamId}/> 
        )
        : null

    return (
        <Card className={classes.card}>
            <CardMedia 
                image={userImg}
                className={classes.image}
                title="Profile_image"/>
            <CardContent className={classes.content}>
                <Typography variants="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`}
                    color="primary">
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography variant="body2" color="textPrimary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeScream screamId={screamId}/>
                <span>{likeCount}</span>
                <TooltipButton tip="comments">
                    <ChatIcon color="primary"/>
                </TooltipButton>
                <span>{commentCount} comments</span>
                <ScreamDialogue screamId={screamId} userHandle={userHandle} openDialog={props.openDialog}/>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
       user: state.user,
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

export default connect(mapStateToProps)(withStyles(styles)(Scream));