export interface TransformEntry {
    /**
     * The relative path
     * (without extension)
     */
    path: string;
    /**
     * The path of the source file
     */
    source: string;
    /**
     * The path of the destination file
     */
    destination: string;
    /**
     * The file name
     */
    name: string;
}
/** dts2md break */
/**
 * The index composer generates index file
 * content from the file entry array
 */
export type IndexComposer = (entries: TransformEntry[]) => string;
/** dts2md break */
/**
 * Default index composer that generate
 * index files in the format below:
 *
 * # API Reference
 *
 * - [path/to/file0](file0)
 * - [path/to/file1](file1)
 * - [path/to/file2](file2)
 *
 */
export const composeIndex: IndexComposer = entries => (
    `# API Reference\n\n${
    entries.map(entry => (
        `- [${entry.path.replace(/\\/g, '/')}](${entry.name})`
    )).join('\n')
    }\n`
);
