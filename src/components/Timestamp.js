import React from 'react';

const currentTime = new Date();

const Timestamp = () => {

    return (
        <footer style={{color: '#FFFFFF'}}><br/>Data retrieved: {currentTime.toDateString()} {currentTime.toTimeString()}</footer>
    );
}

export default Timestamp;