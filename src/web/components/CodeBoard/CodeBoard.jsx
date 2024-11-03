import React from 'react';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FaCode, FaSave, FaShare, FaPlus } from 'react-icons/fa';

function CodeBoard() {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const handleMount = (editor) => {
    // Initialize editor if needed
  };

  const handleCreateComponent = (type) => {
    toast({
      title: 'Component Created',
      status: 'success',
      duration: 2000,
    });
  };

  const handleSave = async () => {
    toast({
      title: 'Board Saved',
      status: 'success',
      duration: 2000,
    });
  };

  const handleShare = () => {
    toast({
      title: 'Share Link Copied',
      description: 'Board link copied to clipboard',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Box h="calc(100vh - 200px)" position="relative">
      <Flex
        position="absolute"
        top={4}
        right={4}
        zIndex={1}
        gap={2}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        p={2}
        borderRadius="md"
        boxShadow="md"
      >
        <Menu>
          <MenuButton as={Button} leftIcon={<FaPlus />} colorScheme="blue" size="sm">
            Add Component
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleCreateComponent('QuazarComponent')}>
              QuazarScript Component
            </MenuItem>
            <MenuItem onClick={() => handleCreateComponent('Note')}>
              Note
            </MenuItem>
            <MenuItem onClick={() => handleCreateComponent('Connector')}>
              Connector
            </MenuItem>
          </MenuList>
        </Menu>

        <Tooltip label="Save Board">
          <IconButton
            icon={<FaSave />}
            onClick={handleSave}
            colorScheme="green"
            size="sm"
          />
        </Tooltip>

        <Tooltip label="Share Board">
          <IconButton
            icon={<FaShare />}
            onClick={handleShare}
            colorScheme="purple"
            size="sm"
          />
        </Tooltip>
      </Flex>

      <Tldraw
        onMount={handleMount}
        darkMode={colorMode === 'dark'}
        showGrid
        snapToGrid
      />
    </Box>
  );
}

export default CodeBoard; 