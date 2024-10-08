/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type JSONSchema7Type =
  | string //
  | number
  | boolean
  | JSONSchema7Object
  | JSONSchema7Array
  | null;

// Workaround for infinite type recursion
export interface JSONSchema7Object {
  [key: string]: JSONSchema7Type;
}

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export interface JSONSchema7Array extends Array<JSONSchema7Type> {}

export type SimplifiedSchemaType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "null";

/**
JSONSchema7 derivative that has the following capabilities and and characteristics...

- does not include objects in objects that are also referenced to using xxxSlug or xxxId
- recursively finds the references and expands them, unless the references are circular
- easier to read
- has all the information we need
- is able to generate an object with values in the exact format the function needs it
- is able to easily generate a form
 */
export interface SimplifiedSchema {
  description?: string;
  /**
   * - string
   * - number
   * - boolean
   * - object
   * - array
   * - null
   *
   * NB: Omit doesn't work for the indexer! This would be the type: Omit<JSONSchema7TypeName, "integer">;
   */
  type: SimplifiedSchemaType;

  /** sometimes we still need to reference to another schema because this thing is recursive. In that case the ref name will be here */
  circularRefName?: string;
  /** in case of enums this could appear... mostly strings, but e.g. numbers can also be an enum I think */
  enum?: JSONSchema7Type[];
  /** in case of object, this will always appear */
  properties?: SimplifiedSchemaProperty[];
  /** in case of arrays, this will always appear */
  items?: SimplifiedSchemaItem[];

  /**
   * Full doccomment, parsed without all stars syntax.
   *
   * NB: besides this, every `CommentType` can optionally also be found as a property on the `SimplifiedSchema`
   */
  fullComment?: string;
}

export type SimplifiedSchemaProperty = {
  name: string;
  schema: SimplifiedSchema;
  /** NB: can't we put this in the SimplifiedSchema itself? */
  required: boolean;
};

export type SimplifiedSchemaItem = {
  /**
   * name in case of it being a reference, otherwise null
   */
  name: string | null;
  schema: SimplifiedSchema;
};
