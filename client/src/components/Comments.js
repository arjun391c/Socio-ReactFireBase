import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.sign,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFir: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20,
    }
})

const Comments = ({ comments, classes }) => {
    return (
        <Grid container>
            {comments.map((comment, i) => {
                const { body, createdAt, userImage, userHandle } = comment;
                return (
                    <React.Fragment key={i}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="comment" className={classes.commentImage}/>
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography
                                        variant="h5"
                                        component={Link} 
                                        to={`/user/${userHandle}`}
                                        color="primary">
                                            {userHandle}
                                        </Typography>
                                        <Typography
                                        variant="body2"
                                        color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invsep}/>
                                        <Typography
                                        variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {i !== comments.length-1 &&
                            <hr className={classes.vissep}/>
                        }
                    </React.Fragment>
                )
            })}
        </Grid>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);