import { useColorScheme } from 'react-native';

import { tokens } from './tokens.generated';

export type ColorScheme = 'light' | 'dark';
export type Colors = { readonly [K in keyof typeof tokens.color.light]: string };

// Font family names as registered in src/app/_layout.tsx.
export const fonts = {
  journal: 'Literata_400Regular',
  journalItalic: 'Literata_400Regular_Italic',
  journalBold: 'Literata_600SemiBold',
  ui: 'Figtree_400Regular',
  uiMedium: 'Figtree_500Medium',
  uiBold: 'Figtree_600SemiBold',
} as const;

export function colorsFor(scheme: ColorScheme): Colors {
  return tokens.color[scheme];
}

export function useTheme() {
  const scheme: ColorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return {
    scheme,
    colors: colorsFor(scheme),
    fonts,
    space: tokens.space,
    radius: tokens.radius,
    size: tokens.size,
    type: tokens.typeScale,
    motion: tokens.motion,
  };
}

export { tokens };
