export const avoidNestedTernary = (condition: boolean, then: string, otherwise: string) =>
  condition ? then : otherwise;
