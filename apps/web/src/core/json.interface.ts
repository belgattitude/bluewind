export type Json = string | number | boolean | null | JsonObject | JsonArray;

export interface JsonObject {
    [property: string]: Json;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<Json> {}
