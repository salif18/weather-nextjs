import React from 'react';

const Zone = ({data}) => {
    return (
        <article className='place-container'>
            <section className='time-zone'>{data && data.timezone}</section>
            <section className='country'>{data && `${data.lat} N ${data.lon} E`}</section>
        </article>
    );
}

export default Zone;
