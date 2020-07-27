import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//store
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions'; 

//MUI
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.sign
})

const SignupPage = ( props ) => {
    const { classes, dispatch, ui: { loading, errors } } = props;
    const [ input, setInput ] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newUserData = {
            ...input,
            history: props.history
        }

        dispatch(signupUser(newUserData))
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                {/* <img src={} alt="logo" className={classes.image}/> */}
                <Typography variant="h2" className={classes.pageTitle}>Sign Up</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id="email" name="email" type="email" label="Email" 
                        className={classes.textField} fullWidth
                        value={input.email} onChange={handleChange}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                    />
                    <TextField id="handle" name="handle" type="text" label="User Name" 
                        className={classes.textField} fullWidth
                        value={input.handle} onChange={handleChange}
                        error={errors.handle ? true : false}
                        helperText={errors.handle}
                    />
                    <TextField id="password" name="password" type="password" label="Password" 
                        className={classes.textField} fullWidth
                        value={input.password} onChange={handleChange}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                    />
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
                        className={classes.textField} fullWidth
                        value={input.confirmPassword} onChange={handleChange}
                        error={errors.confirmpassword ? true : false}
                        helperText={errors.confirmpassword}
                    />
                    { errors.general && (<Typography variant="body2" 
                                        className={classes.customErr}>
                                            {errors.general}
                                        </Typography>
                                    )}
                    <Button type="submit" variant="contained" color="primary" 
                        className={classes.button}
                        disabled={loading}
                        >
                            Login
                            { loading && <CircularProgress size={30} className={classes.progress}/>}
                    </Button>
                    <br/>
                    <small>Already have an account? Login <Link to="/signup">Here</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    const { ui, user } = state;
    return {
        ui,
        user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SignupPage));

SignupPage.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}