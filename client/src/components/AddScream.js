import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//redux
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';
//MUI
import TooltipButton from './TooltipButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { CLEAR_ERRORS } from '../redux/actionTypes';

const styles = (theme) => ({
    ...theme.sign,
    submitButton: {
        position: 'relative',
        marginBottom: 10
    },
    spinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        right: 0
    }
})

const AddScream = ({ ui, dispatch, classes }) => {

    const { loading, errors: { error } } = ui;
    const [open, setOpen] = useState(false);
    const [body, setInput] = useState('');

    const handleOpen = () => {
        setInput('')
        dispatch({ type: CLEAR_ERRORS })
        setOpen(!open)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postScream({ body }, () => handleOpen()))
    }

    return (
        <>
            <TooltipButton tip="Post a Scream" onClick={handleOpen}>
                <AddIcon color="primary"/>
            </TooltipButton>
            <Dialog
            open={open}
            onClose={handleOpen}
            fullWidth
            maxWidth="sm"
            >
                <TooltipButton tip="Close" 
                    onClick={handleOpen}
                    btnClass={classes.closeButton}
                >
                    <CloseIcon />
                </TooltipButton>
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="SCREAM!!"
                            multiline
                            rows="3"
                            placeholder="Write your scream."
                            error={error ? true : false}
                            helperText={error }
                            className={classes.textField} 
                            onChange={(e) => setInput(e.target.value)}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton} disabled={loading}
                            >
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.spinner}/>
                                )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

AddScream.propTypes = {
    ui: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({ui: state.ui})

export default connect(mapStateToProps)(withStyles(styles)(AddScream));