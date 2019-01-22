import stripLeadingWhitespace from './strip-leading-whitespace';

export default function code(string) {
  return stripLeadingWhitespace(string).trim();
}
