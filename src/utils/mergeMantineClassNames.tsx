/**
 * Indicates that the current implementation does not support a function
 * with the given signature that accepts theme, props, and context arguments.
 *
 * @unsupported
 * @param {MantineTheme} theme - Theme details.
 * @param {Props} props - Properties for the function.
 * @param {unknown} ctx - Context object.
 * @returns {Partial<Record<StyleNames, string>>} - Returns a partial record of StyleNames mapped to strings.
 */

import type { MantineTheme } from '@mantine/core';

import { cn } from '@/utils/cn';

type ClassNameMap<StyleNames extends string, Props> =
  | Partial<Record<StyleNames, string>>
  | ((
      theme: MantineTheme,
      props: Props,
      ctx: unknown,
    ) => Partial<Record<StyleNames, string>>);

/**
 * Merges two objects of class names into a single object, combining class names for the same keys
 * and preserving class names from each object if they don't have corresponding keys in the other.
 *
 * @param {Record<string, string>} defaultClassNames - The default class names object.
 * @param {Record<string, string>} overrideClassNames - The overriding class names object.
 * @returns {Record<string, string>} The merged class names object.
 */
export default function mergeMantineClassNames<
  StyleNames extends string,
  Props,
>(
  defaultClassNames: ClassNameMap<StyleNames, Props> = {},
  overrideClassNames: ClassNameMap<StyleNames, Props> = {},
): ClassNameMap<StyleNames, Props> {
  if (defaultClassNames && typeof defaultClassNames === 'function') return {};
  if (overrideClassNames && typeof overrideClassNames === 'function') return {};

  const keys = [
    ...Object.keys(defaultClassNames),
    ...Object.keys(overrideClassNames),
  ].filter(Boolean) as StyleNames[];

  const result: Record<string, string> = {};

  for (const key of keys) {
    if (defaultClassNames?.[key] && overrideClassNames?.[key]) {
      result[key] = cn(defaultClassNames[key], overrideClassNames[key]);
    } else if (defaultClassNames?.[key]) {
      result[key] = defaultClassNames[key]!;
    } else if (overrideClassNames?.[key]) {
      result[key] = overrideClassNames[key]!;
    }
  }

  return result;
}
