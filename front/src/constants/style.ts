type PointColorsType = Record<keyof typeof colors, string>;
type DefaultColorsType = {
  backgroundColor: string;
  backgroundColorSecondary: string;
  fontColorPrimary: string;
  fontColorSecondary: string;
  borderColor: string;
};

export type ColorsType = PointColorsType & DefaultColorsType;
export type ThemeType = {
  light: ColorsType;
  dark: ColorsType;
};

const colors = {
  /** Primary Color */
  BLUE_100: '#E0F7FA',
  BLUE_200: '#B2EBF2',
  BLUE_300: '#4FC3F7',
  BLUE_400: '#29B6F6',
  BLUE_500: '#039BE5',
  /** Secondary Color */
  PINK_100: '#FCE4EC',
  PINK_200: '#F8BBD0',
  PINK_300: '#F48FB1',
  PINK_400: '#F06292',
  PINK_500: '#E91E63',
  /** Highlight Color */
  GREEN_100: '#F1F8E9',
  GREEN_200: '#DCEDC8',
  GREEN_300: '#AED581',
  GREEN_400: '#8BC34A',
  GREEN_500: '#558B2F',
};

const theme: ThemeType = {
  light: {
    backgroundColor: '#FFFFFF',
    backgroundColorSecondary: '#E0E0E0',
    fontColorPrimary: '#212121',
    fontColorSecondary: '#757575',
    borderColor: '#BDBDBD',
    ...colors,
  },
  dark: {
    backgroundColor: '#121212',
    backgroundColorSecondary: '#1E1E1E',
    fontColorPrimary: '#E0E0E0',
    fontColorSecondary: '#828282',
    borderColor: '#424242',
    ...colors,
  },
};

export { theme };
