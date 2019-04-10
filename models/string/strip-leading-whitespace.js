const WHITESPACE_REGEX = /^(\s*)\S+/;

export default function stripLeadingWhitespace(string) {
  if (!string) {
    return string;
  }

  const lines = string.split('\n');
  const allWhitespace = lines
    .map((line) => {
      const match = line.match(WHITESPACE_REGEX);

      // no match means the line is empty
      if (!match) {
        return null;
      }

      return match[1];
    })
    .filter((whitespace) => whitespace !== null);

  const shortestWhitespace = allWhitespace.sort(
    (left, right) => left.length - right.length
  )[0];

  return lines
    .map((line) => line.replace(new RegExp(`^${shortestWhitespace}`), ''))
    .join('\n');
}
