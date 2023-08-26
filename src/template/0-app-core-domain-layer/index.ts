import { ZodTypeAny, z } from "zod";

export function DomainObjectProvider<T extends ZodTypeAny>(
    schema: T,
    defaultFactory: ()=>z.infer<typeof schema>,
    randomFactory: ()=>z.infer<typeof schema>,
) {
    return {
        makeDefault: defaultFactory,
        makeRandom: randomFactory,
        validate: (input: unknown) => schema.safeParseAsync(input)
    }
}