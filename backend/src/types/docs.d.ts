interface IDocsParams {
    summary?: string,
    status?: number,
    description?: string,
    isArray?: boolean,
    type?: Type<unknown> | Function | [Function] | string
}