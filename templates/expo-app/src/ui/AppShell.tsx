import { router, usePathname, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { strings, tuning } from '@/content/load';

import { Logo } from './Logo';
import { useTheme } from './theme';

type NavItem = { href: Href; label: string; match: string };

const items: NavItem[] = [
  { href: '/', label: strings.nav.journal, match: '/' },
  { href: '/week', label: strings.nav.week, match: '/week' },
  { href: '/library', label: strings.nav.library, match: '/library' },
  { href: '/inbox', label: strings.nav.inbox, match: '/inbox' },
  { href: '/insights', label: strings.nav.insights, match: '/insights' },
];

// The frame around every screen: a side menu on wide windows (the PC),
// a bottom bar on narrow ones (the phone, until the phone design pass).
export function AppShell({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions();
  const t = useTheme();
  const pathname = usePathname();
  const wide = width >= tuning.layout.side_nav_min_width;

  const nav = items.map((item) => {
    const active = pathname === item.match;
    return (
        <Pressable
          key={item.match}
          onPress={() => router.navigate(item.href)}
          accessibilityRole="link"
          accessibilityState={{ selected: active }}
          style={({ pressed }) => [
            wide ? styles.sideItem : styles.bottomItem,
            { borderRadius: t.radius.control, minHeight: t.size.touchMin },
            active && { backgroundColor: t.colors.tint },
            !active && pressed && { backgroundColor: t.colors.divider },
          ]}
        >
          <Text
            style={{
              fontFamily: active ? t.fonts.uiBold : t.fonts.ui,
              fontSize: wide ? 15 : 13,
              color: t.colors.text,
              textAlign: wide ? 'left' : 'center',
            }}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </Pressable>
    );
  });

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: t.colors.ground }]} edges={['top', 'left', 'right', 'bottom']}>
      <View style={[styles.frame, { flexDirection: wide ? 'row' : 'column' }]}>
        {wide && (
          <View style={[styles.side, { width: t.size.navWidth, borderRightColor: t.colors.divider }]}>
            <View style={styles.brand}>
              <Logo color={t.colors.primary} eye={t.colors.surface} />
              <Text style={{ fontFamily: t.fonts.journalBold, fontSize: 21, color: t.colors.text }}>
                {strings.app.name}
              </Text>
            </View>
            {nav}
          </View>
        )}
        <View style={styles.main}>{children}</View>
        {!wide && (
          <View style={[styles.bottom, { borderTopColor: t.colors.divider, backgroundColor: t.colors.ground }]}>
            {nav}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  frame: { flex: 1 },
  side: { paddingVertical: 24, paddingHorizontal: 14, gap: 4, borderRightWidth: StyleSheet.hairlineWidth },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 8, marginBottom: 22 },
  sideItem: { paddingHorizontal: 12, justifyContent: 'center' },
  main: { flex: 1, minWidth: 0 },
  bottom: { flexDirection: 'row', paddingHorizontal: 6, paddingVertical: 6, gap: 4, borderTopWidth: StyleSheet.hairlineWidth },
  bottomItem: { flex: 1, paddingHorizontal: 4, justifyContent: 'center' },
});
