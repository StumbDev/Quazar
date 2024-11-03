import { tokenize } from './lexer.js';

export class Parser {
  constructor(source) {
    this.tokens = tokenize(source);
    this.current = 0;
  }

  parse() {
    const program = {
      type: 'Program',
      body: []
    };

    while (!this.isAtEnd()) {
      program.body.push(this.parseStatement());
    }

    return program;
  }

  parseStatement() {
    if (this.match('COMPONENT')) {
      return this.parseComponent();
    }
    if (this.match('STYLE')) {
      return this.parseStyle();
    }
    if (this.match('STATE')) {
      return this.parseState();
    }
    if (this.match('EFFECT')) {
      return this.parseEffect();
    }

    throw new Error('Unexpected token: ' + this.peek().type);
  }

  parseComponent() {
    const name = this.consume('IDENTIFIER', 'Expected component name').value;
    this.consume('LBRACE', 'Expected {');
    const body = this.parseComponentBody();
    this.consume('RBRACE', 'Expected }');

    return {
      type: 'ComponentDeclaration',
      name,
      body
    };
  }

  // ... other parsing methods
} 