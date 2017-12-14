import React from 'react';

export default function Dot({status}) {
    return (
        <div className={'dot ' + status}>&nbsp;</div>
    )
}
