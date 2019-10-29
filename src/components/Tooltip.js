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
        top: (Math.floor(parseInt(props.toolTipDisplayed.relativeElementPosition.top)) - 20 ) + 'px',
        left: (Math.floor(parseInt(props.toolTipDisplayed.relativeElementPosition.left)) + (Math.floor(parseInt(props.toolTipDisplayed.relativeElementPosition.width)) / 2)) + 35 + 'px',
        marginLeft: '-60px',
        transition: 'opacity 0.3s'
    }
    return (
        <div className={'custom-tooltip'} style={style}>{props.toolTipDisplayed.value}</div>
    )
};
