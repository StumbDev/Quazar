import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
} from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { Parser } from '../../quazarscript/parser';
import { Compiler } from '../../quazarscript/compiler';
import { lightTheme, darkTheme, quazarScriptLanguage } from '../theme/monacoTheme';

function Playground() {
  const [qzCode, setQzCode] = useState('');
  const [compiledCode, setCompiledCode] = useState('');
  const [preview, setPreview] = useState(null);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const defaultCode = `@component Counter {
  @state count: number = 0;
  
  @style Button {
    target: button;
    styles {
      padding: 1rem 2rem;
      background: #007bff;
      color: white;
      border-radius: 4px;
      
      &:hover {
        background: #0056b3;
      }
    }
  }

  @method increment => {
    count += 1;
  }

  @template {
    <div>
      <h1>Count: {count}</h1>
      <Button @click="increment()">
        Increment
      </Button>
    </div>
  }
}`;

  useEffect(() => {
    setQzCode(defaultCode);
  }, []);

  // Setup Monaco editor
  const beforeMount = (monaco) => {
    // Register QuazarScript language
    monaco.languages.register({ id: 'quazarscript' });
    monaco.languages.setMonarchTokensProvider('quazarscript', quazarScriptLanguage);
    
    // Register themes
    monaco.editor.defineTheme('quazar-light', lightTheme);
    monaco.editor.defineTheme('quazar-dark', darkTheme);
  };

  const handleCompile = async () => {
    try {
      const parser = new Parser(qzCode);
      const ast = parser.parse();
      const compiler = new Compiler();
      const compiled = compiler.compile(ast);
      setCompiledCode(compiled);

      // Create preview
      const PreviewComponent = new Function('React', 'styled', compiled + '\nreturn Counter;')(
        React,
        styled
      );
      setPreview(<PreviewComponent />);

      toast({
        title: 'Compilation successful',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Compilation error',
        description: error.message,
        status: 'error',
        duration: 4000,
      });
    }
  };

  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
        <GridItem>
          <Text mb={2} fontWeight="bold">QuazarScript</Text>
          <Editor
            height="500px"
            defaultLanguage="quazarscript"
            theme={colorMode === 'light' ? 'quazar-light' : 'quazar-dark'}
            value={qzCode}
            onChange={setQzCode}
            beforeMount={beforeMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono, monospace',
              fontLigatures: true,
              suggestOnTriggerCharacters: true,
              formatOnPaste: true,
              formatOnType: true,
              tabSize: 2,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
            }}
          />
        </GridItem>
        <GridItem>
          <Tabs>
            <TabList>
              <Tab>Compiled Output</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0} mt={2}>
                <Editor
                  height="500px"
                  defaultLanguage="javascript"
                  theme={colorMode === 'light' ? 'quazar-light' : 'quazar-dark'}
                  value={compiledCode}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontLigatures: true,
                  }}
                />
              </TabPanel>
              <TabPanel>
                <Box
                  p={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  minHeight="500px"
                >
                  {preview}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
      <Button colorScheme="blue" onClick={handleCompile}>
        Compile & Run
      </Button>
    </Box>
  );
}

export default Playground; 