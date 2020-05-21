/**
 * @author Nurali K
 * @description Date validator
 */
import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * DateValidators
 */
export class DateValidators {

    /**
     * validate
     * @param dateField1 from date
     * @param dateField2  to date
     * @param validatorField error to throw
     * @description Generic function which accepts two dates to check if fromDate is greater than toDate
     */
    public static validate(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            let date1: Date = new Date(c.get(dateField1).value);
            let date2: Date = new Date(c.get(dateField2).value);
            let newDate1: string = `${date1.getDate()}/${date1.getMonth()}/${date1.getFullYear()}`;
            let newDate2: string = `${date2.getDate()}/${date2.getMonth()}/${date2.getFullYear()}`;
            //TODO fix date validator
            if ((newDate1 === newDate2) || (date1 > date2)) {
                return validatorField;
            }
            return null;
        };
    }
}