
// Define your extensions settings here.
export interface Settings {
  booleanValue: boolean;
  stringValue: string;
}

// default settings that are applied on install.
export const defaultSettings: Settings = {
  booleanValue: true,
  stringValue: 'hello',
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ settings: defaultSettings });
  chrome.storage.local.set({ clickCount: 0 });
})