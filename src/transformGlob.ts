import fastGlob from 'fast-glob';
import pavePath from 'pave-path';
import { TransformFileOptions, transformFile } from './transformFile';
import { join, dirname, basename } from 'path';

export interface TransformGlobResult {
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
}).then(async files => {
    const outputRoot = options.outputRoot || process.cwd();
    await pavePath(outputRoot);
    return await Promise.all(
        files.map(async (fileName): Promise<TransformGlobResult> => {
            const source = options.inputRoot ? join(options.inputRoot, fileName) : fileName,
                destination = join(outputRoot, fileName.slice(0, -4) + 'md');
            await pavePath(dirname(fileName), outputRoot);
            await transformFile(source, destination);
            return {
                source,
                destination,
                name: basename(destination).slice(0, -3),
            };
        })
    );
});
