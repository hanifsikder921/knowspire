import React from 'react';
import ProfileCard from './ProfileCard';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const MyProfile = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <Helmet>
                <title>{`${user?.displayName}-Profile`}</title>
            </Helmet>
            <ProfileCard />
        </div>
    );
};

export default MyProfile;