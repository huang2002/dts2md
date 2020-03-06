import fastGlob from 'fast-glob';
import pavePath from 'pave-path';
import { TransformFileOptions, transformFile } from './transformFile';
import { join, dirname, basename } from 'path';
import { promises as fsPromises } from "fs";
import { IndexComposer, composeIndex, TransformEntry } from '../composer/composeIndex';

export interface TransformGlobResult {
    entries: TransformEntry[];
    indexFile?: string;
}
/** dts2md break */
export interface TransformGlobOptions extends TransformFileOptions {
    /**
     * Options passed to `fast-glob` package
     */
    globOptions?: fastGlob.Options;
    /**
     * The root directory of input files
     */
    inputRoot?: string;
    /**
     * The root directory of output files
     */
    outputRoot?: string;
    /**
     * The index file name
     * (only generates the index file
     * if this option is given)
     */
    indexFile?: string;
    /**
     * The index file composer
     */
    indexComposer?: IndexComposer;
}
/** dts2md break */
/**
 * Transform multiple files using glob
 * (using `fast-glob` package internally)
 */
export const transformGlob = (
    glob: string | string[],
    options: TransformGlobOptions = {}
) => fastGlob(glob, {
    ...options.globOptions,
    cwd: options.inputRoot
}).then<TransformGlobResult>(async files => {

    const outputRoot = options.outputRoot || process.cwd();

    await pavePath(outputRoot);

    const entries = await Promise.all(
        files.map(async (path): Promise<TransformEntry> => {
            const source = options.inputRoot ? join(options.inputRoot, path) : path,
                destination = join(outputRoot, path.slice(0, -4) + 'md');
            await pavePath(dirname(path), outputRoot);
            await transformFile(source, destination);
            return {
                path: path.slice(0, -5),
                source,
                destination,
                name: basename(destination).slice(0, -3),
            };
        })
    );

    const indexFile = options.indexFile && join(outputRoot, options.indexFile);

    if (indexFile) {
        const indexComposer = options.indexComposer || composeIndex;
        await fsPromises.writeFile(indexFile, indexComposer(entries));
    }

    return { entries, indexFile };

});
