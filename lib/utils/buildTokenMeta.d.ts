import type { Index, TokenMeta } from '../types/token';
declare const buildTokenMeta: <VT, ET>(customizeError: TokenMeta<ET>["error"], value: VT, index: Index) => TokenMeta<ET>;
export default buildTokenMeta;
