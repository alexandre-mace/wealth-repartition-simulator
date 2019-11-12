import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import './SnackMessage.css';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

export const SnackMessage = (props) => (
    <Snackbar
        open={props.open}
        anchorOrigin={{ vertical: 'bottom',horizontal: 'right' }}
        autoHideDuration={8000}
        key={`bottom, right`}
        onClose={() => props.handleCloseSnackMessage}
        ClickAwayListenerProps={{ mouseEvent: false}}
        TransitionComponent={TransitionLeft}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.message}</span>}
    />
);
