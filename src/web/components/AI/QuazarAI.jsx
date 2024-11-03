import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  useColorModeValue,
  IconButton,
  Flex,
  Tooltip,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Select,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaRobot, FaCopy, FaCode, FaBrain } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useAuthStore from '../../store/authStore';

const AI_MODELS = {
  'gpt-4': {
    name: 'GPT-4',
    description: 'Most capable model, best for complex tasks',
    isPro: true,
    icon: '🧠',
  },
  'gpt-3.5': {
    name: 'GPT-3.5',
    description: 'Fast and efficient for most tasks',
    isPro: false,
    icon: '⚡',
  },
  'claude-2': {
    name: 'Claude 2',
    description: 'Specialized in code understanding',
    isPro: true,
    icon: '🤖',
  },
  'local': {
    name: 'Local AI',
    description: 'Runs completely offline',
    isPro: true,
    icon: '💻',
  }
};

function QuazarAI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm QuazarAI, your coding assistant. I can help you with:\n\n" +
        "- QuazarScript syntax and examples\n" +
        "- Project structure recommendations\n" +
        "- Code explanations and debugging\n" +
        "- Best practices and patterns\n\n" +
        "How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const messagesEndRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const { isPro } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      status: 'success',
      duration: 2000,
    });
  };

  const handleModelChange = (modelId) => {
    const model = AI_MODELS[modelId];
    if (model.isPro && !isPro) {
      toast({
        title: 'Pro Feature',
        description: 'This model is only available in Pro version',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    setSelectedModel(modelId);
    toast({
      title: 'Model Changed',
      description: `Now using ${model.name}`,
      status: 'success',
      duration: 2000,
    });
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await mockAIResponse(input, selectedModel);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        model: selectedModel 
      }]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <>
      <Tooltip label="Open AI Assistant" placement="left">
        <IconButton
          icon={<FaRobot />}
          position="fixed"
          bottom="4"
          right="4"
          colorScheme="blue"
          size="lg"
          onClick={onOpen}
          borderRadius="full"
        />
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex justify="space-between" align="center">
              <Text>QuazarAI Assistant</Text>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaBrain />}
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  {AI_MODELS[selectedModel].icon} {AI_MODELS[selectedModel].name}
                </MenuButton>
                <MenuList>
                  {Object.entries(AI_MODELS).map(([id, model]) => (
                    <MenuItem
                      key={id}
                      onClick={() => handleModelChange(id)}
                      isDisabled={model.isPro && !isPro}
                    >
                      <Flex align="center" justify="space-between" width="100%">
                        <Text>
                          {model.icon} {model.name}
                        </Text>
                        {model.isPro && (
                          <Badge colorScheme="purple" ml={2}>
                            PRO
                          </Badge>
                        )}
                      </Flex>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </DrawerHeader>

          <DrawerBody p={0}>
            <VStack h="full" spacing={0}>
              <Box
                flex="1"
                w="full"
                overflowY="auto"
                p={4}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray',
                    borderRadius: '24px',
                  },
                }}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    mb={4}
                    p={4}
                    borderRadius="lg"
                    bg={message.role === 'user' ? 'blue.500' : bgColor}
                    color={message.role === 'user' ? 'white' : 'inherit'}
                    borderWidth={message.role === 'assistant' ? '1px' : '0'}
                    borderColor={borderColor}
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontWeight="bold">
                        {message.role === 'user' ? 'You' : 'QuazarAI'}
                      </Text>
                      <IconButton
                        size="sm"
                        icon={<FaCopy />}
                        variant="ghost"
                        onClick={() => copyToClipboard(message.content)}
                      />
                    </Flex>
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={tomorrow}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              <Box p={4} w="full" borderTopWidth="1px">
                <Flex>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask me anything using ${AI_MODELS[selectedModel].name}...`}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    mr={2}
                  />
                  <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    leftIcon={<FaCode />}
                  >
                    Send
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// Enhanced mock AI response function
async function mockAIResponse(input, model) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const modelPrefix = `[${AI_MODELS[model].name}] `;
  
  const responses = {
    'help': `${modelPrefix}Here are some common QuazarScript commands:
\`\`\`qz
@component MyComponent {
  @state count: number = 0;
  
  @method increment => {
    count += 1;
  }
  
  @template {
    <button @click="increment()">
      Count: {count}
    </button>
  }
}
\`\`\``,
    'example': `${modelPrefix}Here's a simple QuazarScript example:
\`\`\`qz
@component TodoList {
  @state todos: array = [];
  @state newTodo: string = "";
  
  @method addTodo => {
    todos.push(newTodo);
    newTodo = "";
  }
  
  @template {
    <div>
      <input @bind="newTodo" />
      <button @click="addTodo()">Add</button>
      <for each="todo" of="todos">
        <div>{todo}</div>
      </for>
    </div>
  }
}
\`\`\``,
  };

  const defaultResponse = `${modelPrefix}I can help you with QuazarScript. Try asking about syntax, components, or specific features!`;
  
  return input.toLowerCase().includes('example') ? responses.example :
         input.toLowerCase().includes('help') ? responses.help :
         defaultResponse;
}

export default QuazarAI; 