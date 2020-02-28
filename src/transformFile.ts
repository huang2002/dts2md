import { TransformReducer } from './reducers';
import { transformCode } from './transformCode';
import { promises as fsPromises } from 'fs';
import { Composer, compose } from './compose';
import { basename } from 'path';

export interface TransformFileOptions {
    /**
     * The encoding of the source file
     * @default utf8
     */
    encoding?: string;
    /**
     * Transform reducers
     */
    reducers?: TransformReducer[];
    /**
     * The file composer that generates the final content
     */
    composer?: Composer;
}
/** dts2md break */
/**
 * Generate the API reference from the source
 * file and output it to destination file
 */
export const transformFile = (
    source: string,
    destination: string,
    options?: TransformFileOptions
) => fsPromises.readFile(source, options && options.encoding || 'utf8')
    .then(content => {
        const composer = options && options.composer || compose,
            name = basename(source).slice(0, -5),
            code = transformCode(content as string, options && options.reducers);
        return fsPromises.writeFile(destination, composer(name, code));
    });
