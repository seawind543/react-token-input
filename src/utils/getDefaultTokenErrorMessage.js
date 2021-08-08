/* eslint no-unused-vars: 0 */

/**
 * Default function for get errorMessage
 * getDefaultTokenErrorMessage(errorMessage)
 *
 * @ tokenValue
 * Type: any (string | number | object | customize data structure)
 * Description: The tokenValue build by `onBuildTokenValue`
 *
 * @ tokenMeta
 * Type: object
 * Description: The token meta
 *
 * @ return
 * Type: string
 * Description: The value for user to edit in an input
 */
const getDefaultTokenErrorMessage = (tokenValue, tokenMeta) => {
  return tokenMeta.error;
};

export default getDefaultTokenErrorMessage;
