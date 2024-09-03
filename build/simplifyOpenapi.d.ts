import { OpenapiDocument } from "./types/openapi-types.js";
/**
 * Turns an openapi document into an array.
 * CURRENTLY DOES NOT SUPPORT REFERENCED DATA!
 *
 * TODO:
 *
 * Question: is there a way to turn any schema that contains object-maps or heavily nested datastructures (like openapi) into a more flat JSONSchema that contains only arrays of objects, in a more general way?
 *
 * Get nerdy on this and make a way to bi-directionally flatten and re-construct object-maps inside of JSON Schemas. If I can represent an openapi as an array of operations, it's going to be very useful.
 */
export declare const simplifyOpenapi: (openapi: OpenapiDocument) => {
    responsesStatusCode: number;
    responseDescription: string | undefined;
    responseMediaType: string;
    responseContentSchema: import("openapi-types").OpenAPIV3_1.ReferenceObject | import("openapi-types").OpenAPIV3_1.SchemaObject | undefined;
    requestBodyRequired: boolean | undefined;
    requestBodyDescription: string | undefined;
    requestBodySchema: import("openapi-types").OpenAPIV3_1.ReferenceObject | import("openapi-types").OpenAPIV3_1.SchemaObject | undefined;
    method: string;
    deprecated?: boolean | undefined;
    summary: string;
    security?: import("openapi-types").OpenAPIV3.SecurityRequirementObject[] | undefined;
    tags?: string[] | undefined;
    externalDocs?: import("openapi-types").OpenAPIV3.ExternalDocumentationObject | undefined;
    description: string;
    operationId?: string | undefined;
    parameters?: (import("openapi-types").OpenAPIV3_1.ReferenceObject | import("openapi-types").OpenAPIV3_1.ParameterObject)[];
    callbacks?: Record<string, import("openapi-types").OpenAPIV3_1.ReferenceObject | import("openapi-types").OpenAPIV3_1.CallbackObject>;
    servers?: import("openapi-types").OpenAPIV3_1.ServerObject[];
    path: string;
    $ref: string | undefined;
}[];
//# sourceMappingURL=simplifyOpenapi.d.ts.map