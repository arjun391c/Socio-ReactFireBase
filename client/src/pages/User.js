import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Scream from '../components/Scream';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/StaticProfile';
import ScreamSkeleton from '../utils/ScreamSkeleton';
//redux
import { connect } from 'react-redux';
import { getUserScreamData } from '../redux/actions/dataActions';
import axios from 'axios';

const User = ({ dispatch, data, match }) => {
    const [profile, setProfile] = useState(null);
    const [screamIdParam, setScreamParam] = useState(null);

    useEffect(() => {
        const handle =  match.params.handle;
        const screamId = match.params.screamId; 
        dispatch(getUserScreamData(handle));
        axios.get(`user/${handle}`)
            .then(res => {
                setProfile(res.data.user);
            })
            .catch(err => console.log(err))
    },[])

    const { screams, loading } = data;   
    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                { !loading
                ?  screams === null ? 
                    (<p>No screams  from this user.</p>) 
                    : !screamIdParam ? (
                        screams.map((scream) => <Scream key={scream.screamId} scream={scream}/>)
                    ) : (
                        screams.map(s => {
                            if(s.screamId !== screamIdParam)
                                return  <Scream key={s.screamId} scream={s}/>
                            else return <Scream key={s.screamId} scream={s} openDialog/>
                        })
                    )
                : <ScreamSkeleton/>} 
            </Grid> 
            <Grid item sm={4} xs={12}>
                {profile === null
                ? <p>Loading...</p>
                : <StaticProfile profile={profile}/>}
            </Grid>  
        </Grid>
    )
}

User.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
    }
}

export default connect(mapStateToProps)(User);
