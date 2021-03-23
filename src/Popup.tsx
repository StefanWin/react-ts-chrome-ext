import {
  Button, CssBaseline, Divider, Grid, IconButton, Paper, ThemeProvider, Typography,
} from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  darkTheme, defaultSettings, lightTheme, Settings,
} from './Background';

interface PopupProps {

}

interface PopupState {
  clickCount: number;
  settings: Settings;
}

class Popup extends React.Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      clickCount: 0,
      settings: defaultSettings,
    };

    chrome.storage.local.get(['settings', 'clickCount'], ({ settings, clickCount }) => {
      const casted = settings as Settings;
      this.setState({
        clickCount,
        settings: casted,
      });
    });
  }

  private handleClick = () => {
    this.setState({
      clickCount: this.state.clickCount + 1,
    }, () => {
      chrome.storage.local.set({ clickCount: this.state.clickCount });
    });
  };

  private goToOptions = () => {
    chrome.tabs.create({ url: '/options.html' });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.settings.useDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <Paper style={{ padding: '5px', margin: '5px', width: '500px' }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4">Popup</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton onClick={this.goToOptions}>
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={this.handleClick}>Click Me</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{`Click Count : ${this.state.clickCount}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={4}>
              <Typography>{`Setting 'stringValue' : ${this.state.settings.stringValue}`}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{`Setting 'booleanValue' : ${this.state.settings.booleanValue}`}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{`Setting 'useDarkTheme' : ${this.state.settings.useDarkTheme}`}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    );
  }
}

ReactDom.render(
  <Popup />,
  document.getElementById('root'),
);
