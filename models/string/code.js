import stripLeadingWhitespace from './strip-leading-whitespace';

export default function code(strings, ...interpolations) {
  const zipped = strings.map((stringPart, index) => [
    stringPart,
    interpolations[index] || '',
  ]);
  const string = zipped.map((parts) => parts.join('')).join('');
  const stripped = stripLeadingWhitespace(string);
  const lines = stripped.split('\n');
  return lines.slice(1, lines.length - 1).join('\n');
}
