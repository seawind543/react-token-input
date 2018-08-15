/**
 * Default function for TokenInput to build user input value into default data structure
 * buildDataFromValue(value)
 *
 * @ value
 * Type: string
 * Description: user input value // (value are the input string separate by separators)
 *
 * @ return
 * Type: string
 * Description: default data structure
 */
export const buildDataFromValue = (value) => {
    return value.trim();
};

/**
 * Default function for TokenInput to get value from customize data structure for user to perform "edit"
 * dataValue(data)
 *
 * @ data
 * Type: object || string || number
 * Description: customize data onject
 *
 * @ return
 * Type: string
 * Description: The value for user to edit
 */
export const getDataValue = (value) => {
    return value;
};

/**
 * Function for TokenInput to build default token data with user's customize data
 * dataItemToTokenData(userData, index)
 *
 * @ userData
 * Type: object || string || number
 * Description: user's customize data
 *
 * @ index
 * Type: number
 * Description: array index for this customize data in data array
 *
 * @ return
 * Type: object
 * Description: token data
 */
export const dataItemToTokenData = (item, index) => {
    return {
        value: item,
        meta: {
            key: `${JSON.stringify(item)}-${Date.now()}-${index}`,
            activated: false,
            error: null
        }
    };
};
