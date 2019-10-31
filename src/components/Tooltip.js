import React from 'react';

export const Tooltip = (props) => {
    let style = {};

    if (props.toolTipDisplayed) {
        style = {
            fontSize: '0.7rem',
            backgroundColor: '#555',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '6px',
            padding: '5px 10px',
            position: 'absolute',
            width: '100px',
            zIndex: 10,
            top: (props.mousePosition.y - 70),
            left: (props.mousePosition.x + 10),
            marginLeft: '-60px',
            transition: 'opacity 0.3s'
        }
    }

    return (
        <>
            {props.toolTipDisplayed !== false &&
            <div className={'custom-tooltip'} style={style}>{props.toolTipDisplayed.country}<br/>{props.toolTipDisplayed.value}</div>
            }
        </>
    )
};
