import raw from './generated.json';
import { contentSchema, type Content } from './schema';

export function parseContent(data: unknown): Content {
  const result = contentSchema.safeParse(data);
  if (!result.success) {
    const where = result.error.issues
      .map((issue) => `content/${issue.path.join(' > ')}: ${issue.message}`)
      .join('\n');
    throw new Error(`A content file needs fixing:\n${where}`);
  }
  return result.data;
}

export const content: Content = parseContent(raw);
export const strings = content.strings;
export const tuning = content.tuning;

export type { Content };