import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TooltipButton from './TooltipButton';
import LikeScream from './LikeScream';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';
//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat'; 
import Unfold from '@material-ui/icons/UnfoldMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//redux
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';
import { CLEAR_ERRORS } from '../redux/actionTypes';

const styles = (theme) => ({
    ...theme.sign,
    profileimage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20 
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    expandBtn: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    spindiv: {
        textAlign: 'center',
        margintop: 50,
        marginBottom: 50
    },
})

const ScreamDialogue = ({ dispatch, ui: { loading }, scream, screamId, classes, openDialog }) => {
    const [open, setOpen] = useState(false);
    const [path, setPath] = useState({
        oldPath: '',
        newPath: ''
    })
    useEffect(() => {
        if (openDialog) {
            handleOpen();
        }
    }, [])

    const handleOpen = () => {
        setPath({
            oldPath: window.location.pathname,
            newPath: `/users/${scream.userHandle}/scream/${screamId}`
        })

        if(path.oldPath === path.newPath) setPath({ ...path, oldPath : `/users/${userHandle}` })
        window.history.pushState(null, null, path.newPath)

        setOpen(!open);
        dispatch(getScream(screamId));
    }
    const handleClose = () => {
        window.history.pushState(null, null, path.oldPath)
        setOpen(false);
        dispatch({ type: CLEAR_ERRORS })
    }

    const { body, createdAt, likeCount, commentCount, userImg, userHandle, comments} = scream;
    return (
        <>
            <TooltipButton onClick={handleOpen} tip="Expamd scream"
            btnClass={classes.expandBtn}>
                <Unfold color="primary"/>
            </TooltipButton>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            >
                <TooltipButton tip="Close" 
                    onClick={handleClose}
                    btnClass={classes.closeButton}
                >
                    <CloseIcon />
                </TooltipButton>
                <DialogContent className={classes.dialogContent}>
                    {loading 
                    ? (
                        <div className={classes.spindiv}>
                            <CircularProgress size={200} thickness={2}/>
                        </div>
                    )
                    : (
                        <Grid container spacing={12}>
                            <Grid item sm={5}>
                                <img src={userImg} alt="Profile" className={classes.profileimage}/>
                            </Grid>
                            <Grid item sm={7}>
                                <Typography
                                component={Link}
                                color="primary"
                                variant="h5"
                                to={`/users/${userHandle}`}
                                >
                                    @{userHandle}
                                </Typography>
                                <hr className={classes.invsep}/>
                                <Typography variant="body2" color="textSecondary">
                                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                </Typography>
                                <hr className={classes.invsep}/>
                                <Typography variant="body1">
                                    {body}
                                </Typography>
                                <LikeScream screamId={screamId}/>
                                <span>{likeCount}</span>
                                <TooltipButton tip="comments">
                                    <ChatIcon color="primary"/>
                                </TooltipButton>
                                <span>{commentCount} comments</span>
                            </Grid>
                            <hr className={classes.vissep}/>
                            <CommentForm screamId={screamId}/>
                            <Comments comments={comments}/>
                        </Grid>
                    )
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

ScreamDialogue.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    ui: state.ui
})

export default connect(mapStateToProps)(withStyles(styles)(ScreamDialogue));