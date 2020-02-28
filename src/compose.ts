/**
 * Composers accept the source file name and
 * transformed code, and generate the content
 * of correspoding document file
 */
export type Composer = (name: string, code: string) => string;
/** dts2md break */
/**
 * Default composer that generate
 * files in the format below:
 *
 * # ${name}
 *
 * ```ts
 * ${code}
 * ```
 *
 */
export const compose: Composer = (name, code) => [
    `# ${name}\n`,
    '```ts',
    code,
    '```\n'
].join('\n');
