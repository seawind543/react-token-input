import type { InputString } from '../types/mix';

/**
 * The type which build-in default functions take
 */
type DefaultValueType = string;

/**
 * Default function for TokenInput to
 * build default token value from user input value
 *
 * defaultBuildTokenValue(inputValue)
 *
 * @ inputValue
 * Type: InputString
 * Description: The user input value // (A value split by TokenSeparator[])
 * Which is `one item` of the `user input string` split by the `separators`
 * Example:
 * - Input string "ABC, DEF" and separators is `,`
 * - defaultBuildTokenValue will be called twice
 * defaultBuildTokenValue('ABC') and buildDefaultTokenValue('DEF')
 *
 * @ return
 * Type: string
 * Description: The default valueType
 */
const defaultBuildTokenValue = <ValueType>(
  inputValue: InputString
): ValueType => {
  // A trick to make the type DefaultValueType to pass type check of ValueType
  // https://www.zhenghao.io/posts/type-functions
  return inputValue.trim() as DefaultValueType & ValueType;
};

export default defaultBuildTokenValue;
