import { Reducers } from './reducers';

/**
 * Default reducers
 */
export const defaultReducers = [
    Reducers.rmImportStmt,
    Reducers.rmDynamicImport,
    Reducers.rmExport,
    Reducers.rmRef,
    Reducers.rmDeclare,
    Reducers.rmPrivate,
    Reducers.rmInlineComments,
    Reducers.transformBreaks,
    Reducers.rmExtraBreaks,
    Reducers.rmStartSpaces,
    Reducers.rmEndSpaces,
];
/** dts2md break */
/**
 * Transform the source code using specific reducers
 * (the reducers are applied from first to last, so
 * the order of them may affect the final result)
 */
export const transformCode = (
    source: string,
    reducers = defaultReducers
) => reducers.reduce(
    (code, reducer) => reducer(code),
    source
);
