import type { FormInputTypes} from "./FormInput.type"

export interface FormParams {
    [columnName: string] : {
      type: FormInputTypes,
      value: string | number
    }
}