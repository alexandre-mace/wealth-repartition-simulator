import React from 'react';
import './Tooltip.css';

export const Tooltip = ({ values, position  }) => {
    let style = {
        fontSize: '0.8rem',
        backgroundColor: '#555',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 10px',
        position: 'absolute',
        width: '120px',
        zIndex: 10,
        top: (position.y),
        left: (position.x),
        marginLeft: '-60px',
        transition: 'opacity 0.3s'
    }

    return (
        <div className={'custom-tooltip'} style={style} >
            {Array.isArray(values) && values.map((value, index) => (
                <React.Fragment key={index}>
                {value} <br/>
                </React.Fragment>
            ))}
        </div>
    )
};
