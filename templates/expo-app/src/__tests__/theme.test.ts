import tokens from '../../docs/design/tokens.json';
import { colorsFor } from '../ui/theme';

describe('theme', () => {
  it('has every design color in light and dark', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const colors = colorsFor(scheme);
      for (const key of Object.keys(tokens.color.light)) {
        expect(colors[key as keyof typeof colors]).toMatch(/^#[0-9A-F]{6}$/i);
      }
    }
  });

  it('is generated from the current tokens.json', () => {
    expect(colorsFor('light')).toEqual(tokens.color.light);
    expect(colorsFor('dark')).toEqual(tokens.color.dark);
  });
});
