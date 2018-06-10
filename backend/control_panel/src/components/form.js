import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 200,
        margin: "auto"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    root: {
        width: 600,
        margin: "auto",
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class TextFields extends React.Component {
    state = {
        name: '',
        address: '',
        phone: '',
        report: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}
                    alignItems="center"
                    justify="center">
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    fullwidth
                                    margin="normal"
                                />
                                <TextField
                                    id="phone"
                                    label="phone"
                                    className={classes.textField}
                                    value={this.state.phone}
                                    onChange={this.handleChange('phone')}
                                    fullwidth
                                    margin="normal"
                                />
                                <TextField
                                    id="address"
                                    label="address"
                                    className={classes.textField}
                                    value={this.state.address}
                                    onChange={this.handleChange('address')}
                                    fullwidth
                                    margin="normal"
                                />
                                <TextField
                                    id="report"
                                    label="report"
                                    className={classes.textField}
                                    value={this.state.report}
                                    onChange={this.handleChange('report')}
                                    multiline
                                    rows="4"
                                    fullWidth
                                    margin="normal"
                                />
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div >

        )

    }
}
TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);


