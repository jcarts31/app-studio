import raw from '../content/generated.json';
import { parseContent } from '../content/load';

describe('content files', () => {
  it('match their schema', () => {
    expect(() => parseContent(raw)).not.toThrow();
  });

  it('explain a broken file clearly', () => {
    const broken = { ...raw, strings: { ...raw.strings, nav: { ...raw.strings.nav, journal: '' } } };
    expect(() => parseContent(broken)).toThrow(/content\/strings > nav > journal/);
  });
});
