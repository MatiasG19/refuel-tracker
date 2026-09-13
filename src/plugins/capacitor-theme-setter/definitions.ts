export interface ThemeSetterPlugin {
  /**
   * Set theme
   * @param options
   */
  setTheme(options: { themeId: number }): void
}
