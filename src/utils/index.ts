import {freeze} from "icepick";
import {DeepReadonly} from "ts-essentials";

export function makeReadonly<T>(input: T) {
    return freeze(input) as DeepReadonly<T>;
}