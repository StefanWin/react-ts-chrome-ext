import {
  Button, Checkbox, CssBaseline,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
  FormControlLabel, Grid, Paper,
  TextField, ThemeProvider, Typography,
} from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import {
  darkTheme, defaultSettings, lightTheme, Settings,
} from './background';

interface OptionsProps {

}

interface OptionsState {
  settings: Settings;
  showConfirmDialog: boolean;
}

class Options extends React.Component<OptionsProps, OptionsState> {
  constructor(props: OptionsProps) {
    super(props);

    this.state = {
      settings: defaultSettings,
      showConfirmDialog: false,
    };

    chrome.storage.local.get('settings', ({ settings }) => {
      const casted = settings as Settings;
      this.setState({
        settings: casted,
      });
    });
  }

  updateStorage = () => {
    chrome.storage.local.set({ settings: this.state.settings });
  };

  handleCheckBoxToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [event.target.name]: event.target.checked,
      },
    }, this.updateStorage);
  };

  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [event.target.name]: event.target.value,
      },
    }, this.updateStorage);
  };

  resetSettings = () => {
    this.setState({
      settings: defaultSettings,
      showConfirmDialog: false,
    }, this.updateStorage);
  };

  toggleShowConfirmDialog = () => {
    this.setState({
      showConfirmDialog: !this.state.showConfirmDialog,
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.settings.useDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <span>
          <Dialog
            open={this.state.showConfirmDialog}
            onClose={this.toggleShowConfirmDialog}
          >
            <DialogTitle>Reset extensions settings to default values?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This Action cannot be undone!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleShowConfirmDialog} autoFocus>
                Cancel
              </Button>
              <Button onClick={this.resetSettings}>
                Reset Settings
              </Button>
            </DialogActions>
          </Dialog>
        </span>
        <Paper style={{ padding: '5px', margin: '5px' }}>
          <Grid container spacing={2} alignContent="center" direction="column">
            <Grid item xs={12}>
              <Typography variant="h1">Options</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={this.state.settings.booleanValue} onChange={this.handleCheckBoxToggle} name="booleanValue" />}
                label="booleanValue"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={this.state.settings.useDarkTheme} onChange={this.handleCheckBoxToggle} name="useDarkTheme" />}
                label="Use Dark Theme?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={this.state.settings.stringValue}
                onChange={this.handleTextChange}
                name="stringValue"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.toggleShowConfirmDialog}
              >
                Reset Settings
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    );
  }
}

ReactDom.render(
  <Options />,
  document.getElementById('root'),
);
