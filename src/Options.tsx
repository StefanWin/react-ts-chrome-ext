import { Checkbox, createMuiTheme, CssBaseline, FormControlLabel, Grid, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import { defaultSettings, Settings } from './background';


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
      settings: defaultSettings
    }

    chrome.storage.local.get('settings', ({ settings }) => {
      const casted = settings as Settings;
      this.setState({
        settings: casted
      })
    })

  }

  updateStorage = () => {
    chrome.storage.local.set({ settings: this.state.settings });
  }

  handleCheckBoxToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [event.target.name]: event.target.checked,
      }
    }, this.updateStorage)
  }

  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [event.target.name]: event.target.value
      }
    }, this.updateStorage);
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
              control={<Checkbox checked={this.state.settings.booleanValue} onChange={this.handleCheckBoxToggle} name="booleanValue" />}
              label="booleanValue"
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