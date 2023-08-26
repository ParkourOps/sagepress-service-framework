import { ZodType, z } from "zod";

export class DomainObjectProviderBuilder<
    T extends ZodType
> {
    #schema: T;
    #defaultValueFactory?: ()=>z.infer<T>;
    #randomValueFactory?: ()=>z.infer<T>;
    constructor(schema: T) {
        this.#schema = schema;
    }
    setDefaultValueFactory(defaultValueFactory: ()=>z.infer<T>) {
        this.#defaultValueFactory = defaultValueFactory;
    }
    setRandomValueFactory(randomValueFactory: ()=>z.infer<T>) {
        this.#randomValueFactory = randomValueFactory;
    }
    build() {
        const validator = (input: unknown) => this.#schema.safeParse(input);
        const defaultValueFactory = this.#defaultValueFactory;
        const randomValueFactory = this.#randomValueFactory;
        return {
            validator,
            defaultValueFactory,
            randomValueFactory
        }
    }
}