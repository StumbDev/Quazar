export class Compiler {
  compile(ast) {
    switch (ast.type) {
      case 'Program':
        return this.compileProgram(ast);
      case 'ComponentDeclaration':
        return this.compileComponent(ast);
      case 'StyleDeclaration':
        return this.compileStyle(ast);
      case 'StateDeclaration':
        return this.compileState(ast);
      case 'EffectDeclaration':
        return this.compileEffect(ast);
      default:
        throw new Error(`Unknown node type: ${ast.type}`);
    }
  }

  compileProgram(node) {
    const imports = `
      import React, { useState, useEffect } from 'react';
      import styled from 'styled-components';
    `;

    const body = node.body.map(stmt => this.compile(stmt)).join('\n\n');
    return imports + '\n\n' + body;
  }

  compileComponent(node) {
    const componentBody = this.compileComponentBody(node.body);
    return `
      function ${node.name}(props) {
        ${componentBody}
      }
    `;
  }

  compileStyle(node) {
    return `
      const ${node.name} = styled.${node.element}\`
        ${node.rules.join('\n')}
      \`;
    `;
  }

  compileState(node) {
    return `const [${node.name}, set${capitalize(node.name)}] = useState(${node.initialValue});`;
  }

  compileEffect(node) {
    return `
      useEffect(() => {
        ${node.body}
      }, [${node.dependencies.join(', ')}]);
    `;
  }
} 