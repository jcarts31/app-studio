import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTheme } from './theme';

// A titled screen with a calm empty-state line, used by the placeholder screens.
export function Screen({ title, note, children }: { title: string; note?: string; children?: ReactNode }) {
  const t = useTheme();
  return (
    <ScrollView contentContainerStyle={[styles.body, { padding: t.space.page }]}>
      <Text accessibilityRole="header" style={{ fontFamily: t.fonts.journalBold, fontSize: t.type.title.size, color: t.colors.text }}>
        {title}
      </Text>
      {note ? (
        <View style={[styles.note, { backgroundColor: t.colors.surface, borderColor: t.colors.divider, borderRadius: t.radius.card }]}>
          <Text style={{ fontFamily: t.fonts.journal, fontSize: 17, lineHeight: 28, color: t.colors.textSecondary }}>{note}</Text>
        </View>
      ) : null}
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { gap: 18, maxWidth: 760 },
  note: { padding: 18, borderWidth: StyleSheet.hairlineWidth },
});
