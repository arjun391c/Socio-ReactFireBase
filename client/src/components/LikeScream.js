import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TooltipButton from './TooltipButton';
import FavBorderIcon from '@material-ui/icons/FavoriteBorder'; 
import FavIcon from '@material-ui/icons/Favorite'; 

import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

const LikeScream = ({ user: { likes, authenticated }, screamId, dispatch }) => {
    const likedScream = () => {
        if( likes && likes.find((l) => l.screamId === screamId)) {
            return true;
        } 
        return false;
    }

    const likeButton = !authenticated
        ? (
            <TooltipButton tip="like">
                <Link to='/login'>
                    <FavBorderIcon color="primary"/>
                </Link>
            </TooltipButton>
        )
        : (
            likedScream() ? (
                <TooltipButton tip="Unlike" 
                onClick={() => dispatch(unlikeScream(screamId))}>
                    <FavIcon color="primary"/>
                </TooltipButton>
            ) 
            : (
                <TooltipButton tip="Like" 
                onClick={() => dispatch(likeScream(screamId))}>
                    <FavBorderIcon color="primary"/>
                </TooltipButton>
            )
        )
    return (
        <>
            {likeButton}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
       user: state.user,
    }
}

LikeScream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    screamId: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(LikeScream);