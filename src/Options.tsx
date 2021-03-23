import { Checkbox, createMuiTheme, CssBaseline, FormControlLabel, Grid, Paper, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import { Settings } from './Background';


const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
})

interface OptionsProps {

}

interface OptionsState {
  settings: Settings;
}

class Options extends React.Component<OptionsProps, OptionsState>{

  constructor(props: OptionsProps) {
    super(props);

    this.state = {
      settings: {
        foo: false,
        bar: false,
      }
    }

    chrome.storage.local.get('settings', ({ settings }) => {
      const casted = settings as Settings;
      this.setState({
        settings: casted
      })
    })

  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [event.target.name]: event.target.checked,
      }
    }, () => {
      chrome.storage.local.set({ settings: this.state.settings });
    })
  }

  render() {
    return (
      <Paper style={{ padding: "5px", margin: "5px" }}>
        <Grid container spacing={2} alignContent="center" direction="column">
          <Grid item xs={12}>
            <Typography variant="h1">Options</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={this.state.settings.foo} onChange={this.handleChange} name="foo" />}
              label="foo"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={this.state.settings.bar} onChange={this.handleChange} name="bar" />}
              label="bar"
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

ReactDom.render(
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Options />
        </ThemeProvider>,
  document.getElementById("root")
)