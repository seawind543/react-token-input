import type { Index, TokenMeta } from '../types/token';
declare const buildTokenMeta: <VT, ET>(customizeError: import("../types/mix").Nullish | ET, value: VT, index: Index) => TokenMeta<ET>;
export default buildTokenMeta;
