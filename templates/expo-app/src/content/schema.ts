import { z } from 'zod';

// The shape of every content file. If a file in content/ doesn't match, the app
// shows exactly which line is wrong instead of failing quietly.

const text = z.string().min(1);

export const stringsSchema = z.object({
  app: z.object({ name: text }),
  nav: z.object({ journal: text, week: text, library: text, inbox: text, insights: text }),
  journal: z.object({ title: text, empty: text, new_entry: text }),
  week: z.object({ title: text, empty: text }),
  library: z.object({ title: text, empty: text }),
  inbox: z.object({ title: text, coming_later: text }),
  insights: z.object({ title: text, coming_later: text }),
});

export const tuningSchema = z.object({
  layout: z.object({ side_nav_min_width: z.number().int().positive() }),
  claude: z.object({
    models: z.object({ draft: text, review: text }),
    monthly_cap_usd: z.number().positive(),
  }),
});

export const contentSchema = z.object({
  strings: stringsSchema,
  tuning: tuningSchema,
});

export type Content = z.infer<typeof contentSchema>;
