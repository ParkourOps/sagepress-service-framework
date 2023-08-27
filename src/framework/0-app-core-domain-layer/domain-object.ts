import { UnknownKeysParam, ZodObject, ZodRawShape, ZodType, ZodTypeAny, ZodTypeDef, objectInputType, objectOutputType, z } from "zod";
import { makeReadonly } from "../../utils";
import { UnimplementedMethod } from "../../utils/symbols";
import { generateUniqueId } from "../../utils/random";

export type TDefaultValueFactory<TSchema extends ZodTypeAny> = ()=>z.infer<TSchema>;
export type TRandomValueFactory<TSchema extends ZodTypeAny> = ()=>z.infer<TSchema>;


export function makeDomainObjectService<
    TDefaultValueFactoryArg extends TDefaultValueFactory<ZodObject<T, U, V, W, X>> | typeof UnimplementedMethod,
    TRandomValueFactoryArg extends TRandomValueFactory<ZodObject<T, U, V, W, X>> | typeof UnimplementedMethod,
    T extends ZodRawShape,
    U extends UnknownKeysParam = UnknownKeysParam,
    V extends ZodTypeAny = ZodTypeAny,
    W = objectOutputType<T, V, U>,
    X = objectInputType<T, V, U>,
>(
    schema: ZodObject<T, U, V, W, X>,
    defaultValueFactory: TDefaultValueFactoryArg,
    randomValueFactory: TRandomValueFactoryArg
) {
    return makeReadonly({
        validate:(input: unknown) => schema.safeParse(input),
        makeDefaultValue: defaultValueFactory,
        generateRandomValue: randomValueFactory,
        get schema() {
            return schema
        }
    });
}
export type DomainObjectType<T extends {schema: ZodTypeAny}> = z.infer<T["schema"]>;


export function makeDomainObjectPropertyService<
    U,
    V extends ZodTypeDef,
    W,
    TDefaultValueFactoryArg extends TDefaultValueFactory<ZodType<U, V, W>> | typeof UnimplementedMethod,
    TRandomValueFactoryArg extends TRandomValueFactory<ZodType<U, V, W>> | typeof UnimplementedMethod,
>(
    schema: ZodType<U, V, W>,
    defaultValueFactory: TDefaultValueFactoryArg,
    randomValueFactory: TRandomValueFactoryArg,
) {
    return makeReadonly({
        validate:(input: unknown) => schema.safeParse(input),
        makeDefaultValue: defaultValueFactory,
        generateRandomValue: randomValueFactory,
        get schema() {
            return schema
        }
    });
}


export function makeDomainObjectIdService(prefix: string) {
    return makeDomainObjectPropertyService(
        z.string().nonempty().startsWith(prefix),
        UnimplementedMethod,
        ()=>generateUniqueId(prefix)
    );
}

