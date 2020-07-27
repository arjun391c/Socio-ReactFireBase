import React, {useState} from 'react'; 
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//redux
import { connect } from 'react-redux';
import { postComment } from '../redux/actions/dataActions'; 

const styles = (theme) => ({
    ...theme.sign,

})

const CommentForm = ({ screamId, dispatch, classes, authenticated, ui: { errors } }) => {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        setBody(e.target.value);
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postComment(screamId, {body}))
        if(!errors.comment) setBody('') 
    }

    return (
        <>
            {authenticated ? (
                <Grid item sm={12} style={{ textAlign: 'center' }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="Comment on Scream"
                            error={errors.comment ? true : false}
                            helperText={errors.comment}
                            value={body}
                            onChange={handleChange}
                            fullWidth
                            className={classes.textField}
                            />
                        <Button type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            >Submit</Button>
                    </form>
                    <hr className={classes.vissep}/>
                </Grid>
            )
            : null
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    authenticated: state.user.authenticated
})

CommentForm.propTypes = {
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(CommentForm));
