import React from 'react';
import ProfileCard from './ProfileCard';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import PageWrapper from '../../components/TransitionWrapper/PageWrapper';

const MyProfile = () => {
    const { user } = useContext(AuthContext)
    return (
        <PageWrapper>
            <div>
                <Helmet>
                    <title>{`${user?.displayName}-Profile`}</title>
                </Helmet>
                <ProfileCard />
            </div>
        </PageWrapper>
    );
};

export default MyProfile;