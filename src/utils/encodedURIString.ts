export function encodedURIString(strings: TemplateStringsArray, ...params: any[]) {
  return strings.map((string, index) => string + encodeURIComponent(params?.[index] || '')).join('');
}
