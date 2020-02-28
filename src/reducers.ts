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
        /^export\s*\{.*\};?\s*$|^export.+from\s*(?:".*"|'.*');?\s*$|^export /mg;
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

    const DECLARE_PATTERN = /declare /g;
    /**
     * Remove declare prefixes
     */
    export const rmDeclare: TransformReducer = code => (
        code.replace(DECLARE_PATTERN, '')
    );

    const INLINE_COMMENT_PATTERN = /\s*\/\/.*$|^\s*\/\/.*$/mg;
    /**
     * Remove inline comments (// ...)
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

    const EXTRA_BREAK_PATTERN = /(?:\s*\n){3,}/g;
    /**
     * Remove extra line breaks
     */
    export const rmExtraBreaks: TransformReducer = code => (
        code.replace(EXTRA_BREAK_PATTERN, '\n\n')
    );

}
