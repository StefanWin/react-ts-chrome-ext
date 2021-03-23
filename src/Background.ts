
export interface Settings {
  foo: boolean;
  bar: boolean;
}

const defaultSettings: Settings = {
  foo: true,
  bar: false,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ settings: defaultSettings });
})