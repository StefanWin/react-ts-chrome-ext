import { createMuiTheme } from '@material-ui/core';

// define your themes here
// https://material-ui.com/customization/theming/
export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

// Define your extensions settings here.
export interface Settings {
  booleanValue: boolean;
  stringValue: string;
  useDarkTheme: boolean;
}

// default settings that are applied on install.
export const defaultSettings: Settings = {
  booleanValue: true,
  stringValue: 'hello',
  useDarkTheme: true,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ settings: defaultSettings });
  chrome.storage.local.set({ clickCount: 0 });
});
