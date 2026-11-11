import type { ConfigContext, ExpoConfig } from 'expo/config';

// App variants: the development build installs as a separate app ("{{Name}} (dev)")
// so it can sit beside the normal build on the phone.
// Set APP_VARIANT=development for local dev builds (see docs/SETUP.md).
const IS_DEV = process.env.APP_VARIANT === 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? '{{Name}} (dev)' : '{{Name}}',
  slug: '{{slug}}',
  android: {
    ...config.android,
    package: IS_DEV ? 'com.jcarts.{{slug}}.dev' : 'com.jcarts.{{slug}}',
  },
  ios: {
    ...config.ios,
    bundleIdentifier: IS_DEV ? 'com.jcarts.{{slug}}.dev' : 'com.jcarts.{{slug}}',
  },
});
