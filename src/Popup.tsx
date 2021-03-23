import { Button, createMuiTheme, CssBaseline, Grid, IconButton, Paper, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import SettingsIcon from '@material-ui/icons/Settings';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
})

interface PopupProps {

}

interface PopupState {
  clickCount: number;
}

class Popup extends React.Component<PopupProps, PopupState>{

  constructor(props: PopupProps) {
    super(props);
    this.state = {
      clickCount: 0
    }
  }

  private handleClick = () => {
    this.setState({
      clickCount: this.state.clickCount + 1
    })
  }

  private goToOptions = () => {
    chrome.tabs.create({ url: "/options.html" });
  }

  render() {
    return (
      <Paper style={{ padding: "5px", margin: "5px", width: "500px" }}>
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
        </Grid>
      </Paper>
    )
  }
}

ReactDom.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Popup />
  </ThemeProvider>,
  document.getElementById("root")
)