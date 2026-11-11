import app from '../../app.json';
import brand from '../../assets/brand/brand.json';
import tokens from '../../docs/design/tokens.json';

describe('brand settings', () => {
  it('adaptive icon background matches brand.json', () => {
    expect(app.expo.android.adaptiveIcon.backgroundColor).toBe(brand.adaptive.background_color);
  });

  it('splash colors match brand.json', () => {
    const splash = app.expo.plugins.find((p) => Array.isArray(p) && p[0] === 'expo-splash-screen') as [string, any];
    expect(splash[1].backgroundColor).toBe(brand.splash.background_color);
    expect(splash[1].dark.backgroundColor).toBe(brand.splash.background_color_dark);
  });

  it('brand main color is the design primary', () => {
    expect(brand.main_color).toBe(tokens.color.light.primary);
  });
});
