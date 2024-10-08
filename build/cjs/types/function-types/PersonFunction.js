"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * `MiracleFunction` where the instance is an id of a `Person`. There can be additional context, depending on the function.

Example:

```ts

const sendMessageToPerson: PersonFunction<{ message: string }> = (
    functionContext: FunctionContext,
    personId: string,
    context
  ) => {
    return { isSuccessful: false, message: "Not implemented yet" };
}
```
//  */
// export type PersonFunction<TContext> = MiracleFunction<
//   StandardResponse,
//   string,
//   TContext
// >;*/
//# sourceMappingURL=PersonFunction.js.map