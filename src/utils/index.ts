import {freeze} from "icepick";
import {DeepReadonly} from "ts-essentials";
import _ from "lodash";

export function makeReadonly<T>(input: T) {
    return freeze(input) as DeepReadonly<T>;
}

export function makeReadonlyCopy<T>(input: T) {
    const copy = _.cloneDeep(input);
    return makeReadonly(copy);
}