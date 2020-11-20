/**
 * Each transform reducer transforms
 * the code in some way
 * (built-in reducers are introduced below)
 */
export type TransformReducer = (code: string) => string;
/** dts2md break */
/**
 * The namespace of built-in transform reducers
 */
export namespace Reducers {

    const IMPORT_STMT_PATTERN = /^import.*$/mg;
    /**
     * Remove import statements
     */
    export const rmImportStmt: TransformReducer = code => (
        code.replace(IMPORT_STMT_PATTERN, '')
    );

    const DYNAMIC_IMPORT_PATTERN = /import\([^\)]+\)\./g;
    /**
     * Remove dynamic imports
     */
    export const rmDynamicImport: TransformReducer = code => (
        code.replace(DYNAMIC_IMPORT_PATTERN, '')
    );

    const EXPORT_PATTERN =
        /^\s*export\s*\{.*\};?\s*$|^\s*export.+from\s*(?:".*"|'.*');?\s*$|^export /mg;
    /**
     * Remove export prefixes
     */
    export const rmExport: TransformReducer = code => (
        code.replace(EXPORT_PATTERN, '')
    );

    const REFERENCE_PATTERN = /^\/\/\/\s*\<reference.+\/\>\s+$/mg;
    /**
     * Remove triple-slash references
     */
    export const rmRef: TransformReducer = code => (
        code.replace(REFERENCE_PATTERN, '')
    );

    const DECLARE_PATTERN =
        /declare (?=class|function|const|let|var|interface|type|namespace|enum)/g;
    /**
     * Remove declare prefixes
     */
    export const rmDeclare: TransformReducer = code => (
        code.replace(DECLARE_PATTERN, '')
    );

    const PRIVATE_PATTERN = /^\s*private\s+\w+.+\s*$/mg;
    /**
     * Remove private properties/methods
     */
    export const rmPrivate: TransformReducer = code => (
        code.replace(PRIVATE_PATTERN, '')
    );

    const INLINE_COMMENT_PATTERN = /^\s*\/\/.*$/mg;
    /**
     * Remove inline comments
     */
    export const rmInlineComments: TransformReducer = code => (
        code.replace(INLINE_COMMENT_PATTERN, '')
    );

    /**
     * Remove white spaces at the top of the file
     */
    export const rmStartSpaces: TransformReducer = code => code.trimStart();

    /**
     * Remove white spaces at the bottom of the file
     */
    export const rmEndSpaces: TransformReducer = code => code.trimEnd();

    const BREAK_PATTERN = /^\s*\/\*\*?\s*dts2md break\s*\*\/\s*$/mg;
    /**
     * Transform break marks to line breaks
     * (a break mark is a block comment that only
     * contains "dts2md break"; note that if the
     * type declaration files are generated from
     * your ts files by typescript compiler, you
     * may need to use block comments starting
     * with double stars(/**) to prevent marks
     * from being removed by the compiler)
     */
    export const transformBreaks: TransformReducer = code => (
        code.replace(BREAK_PATTERN, '\n')
    );

    const LINE_BREAK_PATTERN = /(?:\s*\n){2,}/g;
    /**
     * Remove all line breaks
     * (you can place this reducer after all other
     * removal reducers and append `transformBreaks`
     * after this to transform break marks to line
     * breaks while removing other line breaks created
     * by other removal reducers)
     */
    export const rmLineBreaks: TransformReducer = code => (
        code.replace(LINE_BREAK_PATTERN, '\n\n')
    );

}
