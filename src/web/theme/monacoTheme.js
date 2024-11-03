export const lightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A737D' },
    { token: 'keyword', foreground: 'D73A49', fontStyle: 'bold' },
    { token: 'string', foreground: '032F62' },
    { token: 'number', foreground: '005CC5' },
    { token: 'type', foreground: '6F42C1' },
    { token: 'class', foreground: '6F42C1', fontStyle: 'bold' },
    { token: 'function', foreground: '6F42C1' },
    { token: 'variable', foreground: '24292E' },
    { token: 'decorator', foreground: '005CC5' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#24292E',
    'editor.lineHighlightBackground': '#F1F8FF',
    'editor.selectionBackground': '#0366D625',
    'editorCursor.foreground': '#0366D6',
    'editorWhitespace.foreground': '#BFBFBF',
    'editorLineNumber.foreground': '#6A737D',
    'editor.selectionHighlightBackground': '#34D05840',
  }
};

export const darkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A737D' },
    { token: 'keyword', foreground: 'FF7B72', fontStyle: 'bold' },
    { token: 'string', foreground: 'A5D6FF' },
    { token: 'number', foreground: '79C0FF' },
    { token: 'type', foreground: 'D2A8FF' },
    { token: 'class', foreground: 'D2A8FF', fontStyle: 'bold' },
    { token: 'function', foreground: 'D2A8FF' },
    { token: 'variable', foreground: 'C9D1D9' },
    { token: 'decorator', foreground: '79C0FF' },
  ],
  colors: {
    'editor.background': '#1A202C',
    'editor.foreground': '#C9D1D9',
    'editor.lineHighlightBackground': '#161B22',
    'editor.selectionBackground': '#264F7840',
    'editorCursor.foreground': '#58A6FF',
    'editorWhitespace.foreground': '#484F58',
    'editorLineNumber.foreground': '#6E7681',
    'editor.selectionHighlightBackground': '#17E5E640',
  }
};

// Language definition for QuazarScript
export const quazarScriptLanguage = {
  defaultToken: '',
  tokenPostfix: '.qz',
  keywords: [
    'component', 'state', 'method', 'effect', 'style', 'template',
    'if', 'else', 'for', 'of', 'in', 'return', 'true', 'false',
    'null', 'undefined', 'this'
  ],
  typeKeywords: [
    'string', 'number', 'boolean', 'array', 'object'
  ],
  operators: [
    '=', '>', '<', '!', '~', '?', ':',
    '==', '<=', '>=', '!=', '&&', '||', '++', '--',
    '+', '-', '*', '/', '&', '|', '^', '%', '<<',
    '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
    '^=', '%=', '<<=', '>>=', '>>>='
  ],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  tokenizer: {
    root: [
      // Decorators
      [/@[a-zA-Z_]\w*/, 'decorator'],
      
      // Identifiers and keywords
      [/[a-z_$][\w$]*/, {
        cases: {
          '@typeKeywords': 'type',
          '@keywords': 'keyword',
          '@default': 'identifier'
        }
      }],
      
      // Whitespace
      { include: '@whitespace' },
      
      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/'([^'\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string_double'],
      [/'/, 'string', '@string_single'],
      
      // Numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],
    ],
    
    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],
    
    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ],
    
    string_double: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, 'string', '@pop']
    ],
    
    string_single: [
      [/[^\\']+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/'/, 'string', '@pop']
    ],
  }
}; 