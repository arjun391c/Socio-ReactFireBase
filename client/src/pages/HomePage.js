import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
//components
import ScreamSkeleton from '../utils/ScreamSkeleton';
import Scream from '../components/Scream';
import Profile from '../components/Profile';
//redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

const HomePage = ({ data, dispatch }) => {

    const { screams, loading } = data;
    useEffect(() => { 
        dispatch(getScreams())
    },[])
    
    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                { !loading
                ?   screams && screams.map((scream) => <Scream key={scream.screamId} scream={scream}/>)
                : <ScreamSkeleton/>} 
            </Grid> 
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>  
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(HomePage);