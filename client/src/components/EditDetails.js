import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
//MUI
import TooltipButton from './TooltipButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    ...theme.sign,
    button: {
        float: 'right'  
    }
})

const EditDetails = ({ dispatch, credentials, classes }) => {
    const [input, setInput] = useState({
        bio: '',
        website: '',
        location: '',
    })
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const { bio, website, location } = credentials;
        setInput({
            ...input,
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : '' 
        })
    }, [])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleOpen = () => setOpen(!open)

    const { bio, website, location } = input;

    const handleSubmit = () => {
        dispatch(editUserDetails(input))
        handleOpen()
    }

    return (
        <>
            <TooltipButton tip="Edit Details" tipClass="top" 
                btnClass={classes.button}
                onClick={handleOpen}>
                <EditIcon color="primary"/>
            </TooltipButton>
            <Dialog 
                open={open}
                onClose={handleOpen}
                fullWidth
                maxWidth="sm">
                <DialogTitle>Edit Your Details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={bio}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your personal/professional website"
                            className={classes.textField}
                            value={website}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={location}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        credentials: state.user.credentials
    }
} 

export default connect(mapStateToProps)(withStyles(styles)(EditDetails));