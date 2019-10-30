import React from 'react';

export const Tooltip = (props) => {
    const style = {
        fontSize: '0.7rem',
        backgroundColor: '#555',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 10px',
        position: 'absolute',
        zIndex: 10,
        top: (props.mousePosition.y - 40),
        left: (props.mousePosition.x + 35),
        marginLeft: '-60px',
        transition: 'opacity 0.3s'
    }
    return (
        <>
            {props.toolTipDisplayed !== false &&
            <div className={'custom-tooltip'} style={style}>{props.toolTipDisplayed.value}</div>
            }
        </>
    )
};
