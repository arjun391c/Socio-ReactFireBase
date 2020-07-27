import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
//MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TooltipButton from './TooltipButton';
//icon
import DeleteIcon from '@material-ui/icons/DeleteOutline'; 
//redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        right: 10
    }
}

const DeleteScream = ({ screamId, classes, dispatch}) => {

    const [open, isOpen] = useState(false);

    const handleOpen = () => isOpen(!open)

    const onDelete = () => {
        dispatch(deleteScream(screamId));
        isOpen(false)
    }
    
    return (
        <>
            <TooltipButton tip="Delete Scream"
                onClick={handleOpen}
                btnClass={classes.deleteButton}
                >
                <DeleteIcon color="secondary"/>
            </TooltipButton>
            <Dialog 
                open={open}
                onClose={handleOpen}
                fullWidth
                maxWidth="sm">
                <DialogTitle>
                    Are You sure, Delete?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleOpen} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

DeleteScream.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect()(withStyles(styles)(DeleteScream));