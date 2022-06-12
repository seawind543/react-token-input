import type { InputString } from '../types/mix';

// The type which build-in default functions take
type DefaultValueType = string;

/**
 * @type {OnBuildTokenValue<ValueType>} defaultBuildTokenValue
 * @description
 * Default function for TokenInput to
 * build default token value from user input value
 *
 * @example
 * ```js
 * defaultBuildTokenValue(inputString)
 * ```
 *
 * @param {InputString} inputString
 * The user input value // (A value split by TokenSeparator[])
 * Example:
 * - Input string "ABC, DEF" and separators is `,`
 * - The `onBuildTokenValue` will be called twice as
 * ```
 * onBuildTokenValue('ABC') and onBuildTokenValue('DEF')
 * ```
 *
 * @returns {string} The token's valueType (string)
 */
const defaultBuildTokenValue = <ValueType>(
  inputString: InputString
): ValueType => {
  // A trick to make the type DefaultValueType to pass type check of ValueType
  // https://www.zhenghao.io/posts/type-functions
  return inputString.trim() as DefaultValueType & ValueType;
};

export default defaultBuildTokenValue;
