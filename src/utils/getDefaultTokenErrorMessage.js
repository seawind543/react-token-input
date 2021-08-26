/* eslint no-unused-vars: 0 */

/**
 * Default function for get errorMessage
 * getDefaultTokenErrorMessage(tokenValue, tokenMeta)
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
 * Description: The error message to describe an invalid token
 */
const getDefaultTokenErrorMessage = (tokenValue, tokenMeta) => {
  if (typeof tokenMeta.error === 'string') {
    return tokenMeta.error;
  }

  return undefined;
};

export default getDefaultTokenErrorMessage;
