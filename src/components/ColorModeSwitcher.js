import React from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

export const ColorModeSwitcher = (props) => {
    return (
        <div className={"color-mode-switcher"}>
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Step</Grid>
                    <Grid item>
                        <Switch
                            checked={props.progressiveColorMode}
                            onChange={props.handleColorModeChange}
                            value={props.progressiveColorMode}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Grid>
                    <Grid item>Progressive</Grid>
                </Grid>
            </Typography>
        </div>
    );
}