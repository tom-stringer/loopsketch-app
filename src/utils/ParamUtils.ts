export default class ParamUtils {
    static isValidId = (id: number): boolean => {
        return !!id && Number.isInteger(id) && id >= 0;
    };

    /**
     * Validate the given ID string, returning a tuple:
     *
     * [true, ID as number] if valid
     *
     * [false, NaN] if not valid
     *
     * @param id string ID parameter
     */
    static validateId = (id: string): [boolean, number] => {
        const numberId = Number(id);

        if (ParamUtils.isValidId(numberId)) {
            return [true, numberId];
        } else {
            return [false, NaN];
        }
    };
}
