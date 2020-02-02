export interface Settings {
  easyMode: SettingsItem;
  normalMode: SettingsItem;
  hardMode: SettingsItem;
}

export interface SettingsItem {
  field: number;
  delay: number;
  name: string;
}
