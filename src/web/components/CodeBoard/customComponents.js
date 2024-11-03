import { createCustomShapeId } from '@tldraw/tldraw';
import { Editor } from '@monaco-editor/react';
import { lightTheme, darkTheme } from '../../theme/monacoTheme';

export const customComponents = {
  QuazarComponent: {
    type: 'QuazarComponent',
    getShape: (props) => ({
      id: createCustomShapeId('QuazarComponent'),
      type: 'QuazarComponent',
      props: {
        code: props.code || '',
        name: props.name || 'Untitled',
      },
      width: 300,
      height: 400,
    }),
    Component: ({ shape, editor, isEditing, onEditEnd }) => {
      const { colorMode } = useColorMode();
      
      return (
        <Box
          w="100%"
          h="100%"
          bg={colorMode === 'light' ? 'white' : 'gray.800'}
          borderRadius="md"
          boxShadow="md"
          p={4}
        >
          <Text fontWeight="bold" mb={2}>{shape.props.name}</Text>
          <Editor
            height="90%"
            language="quazarscript"
            theme={colorMode === 'light' ? 'quazar-light' : 'quazar-dark'}
            value={shape.props.code}
            onChange={(value) => {
              if (isEditing) {
                editor.updateShape({
                  ...shape,
                  props: { ...shape.props, code: value },
                });
              }
            }}
            options={{
              minimap: { enabled: false },
              readOnly: !isEditing,
            }}
          />
        </Box>
      );
    },
  },
  
  Note: {
    type: 'Note',
    getShape: (props) => ({
      id: createCustomShapeId('Note'),
      type: 'Note',
      props: {
        text: props.text || '',
        color: props.color || 'yellow',
      },
      width: 200,
      height: 200,
    }),
    Component: ({ shape, isEditing, onEditEnd }) => {
      return (
        <Box
          w="100%"
          h="100%"
          bg={`${shape.props.color}.100`}
          p={4}
          borderRadius="md"
          boxShadow="md"
        >
          <Textarea
            value={shape.props.text}
            onChange={(e) => {
              if (isEditing) {
                editor.updateShape({
                  ...shape,
                  props: { ...shape.props, text: e.target.value },
                });
              }
            }}
            readOnly={!isEditing}
            h="100%"
            border="none"
            _focus={{ border: 'none' }}
            placeholder="Add note..."
          />
        </Box>
      );
    },
  },
  
  Connector: {
    type: 'Connector',
    getShape: (props) => ({
      id: createCustomShapeId('Connector'),
      type: 'Connector',
      props: {
        startId: props.startId,
        endId: props.endId,
        label: props.label || '',
      },
    }),
    Component: ({ shape }) => {
      return (
        <path
          d={shape.props.path}
          stroke={useColorModeValue('gray.600', 'gray.400')}
          strokeWidth={2}
          fill="none"
          markerEnd="url(#arrow)"
        />
      );
    },
  },
}; 