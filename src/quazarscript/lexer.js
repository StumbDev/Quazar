const KEYWORDS = {
  component: 'COMPONENT',
  style: 'STYLE',
  state: 'STATE',
  effect: 'EFFECT',
  if: 'IF',
  else: 'ELSE',
  for: 'FOR',
  in: 'IN'
};

export function tokenize(source) {
  const tokens = [];
  let current = 0;

  while (current < source.length) {
    let char = source[current];

    // Handle whitespace
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    // Handle identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let value = '';
      while (/[a-zA-Z0-9_]/.test(char)) {
        value += char;
        char = source[++current];
      }

      const type = KEYWORDS[value] || 'IDENTIFIER';
      tokens.push({ type, value });
      continue;
    }

    // Handle numbers
    if (/[0-9]/.test(char)) {
      let value = '';
      while (/[0-9.]/.test(char)) {
        value += char;
        char = source[++current];
      }
      tokens.push({ type: 'NUMBER', value });
      continue;
    }

    // Handle strings
    if (char === '"' || char === "'") {
      const quote = char;
      let value = '';
      char = source[++current];
      
      while (char !== quote) {
        value += char;
        char = source[++current];
      }
      
      current++;
      tokens.push({ type: 'STRING', value });
      continue;
    }

    // Handle special characters
    switch (char) {
      case '{': tokens.push({ type: 'LBRACE', value: '{' }); break;
      case '}': tokens.push({ type: 'RBRACE', value: '}' }); break;
      case '(': tokens.push({ type: 'LPAREN', value: '(' }); break;
      case ')': tokens.push({ type: 'RPAREN', value: ')' }); break;
      case '=': tokens.push({ type: 'EQUALS', value: '=' }); break;
      case ';': tokens.push({ type: 'SEMICOLON', value: ';' }); break;
      // Add more special characters as needed
    }

    current++;
  }

  tokens.push({ type: 'EOF', value: '' });
  return tokens;
} 