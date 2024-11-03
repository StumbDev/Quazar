import React from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  Text,
  Badge,
  useToast
} from '@chakra-ui/react';
import useAuthStore from '../store/authStore';

function Settings() {
  const { user, isPro } = useAuthStore();
  const toast = useToast();

  const handleUpgradeToPro = () => {
    // Implement payment integration here
    toast({
      title: 'Coming Soon',
      description: 'PRO version upgrade will be available soon!',
      status: 'info',
      duration: 3000,
    });
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Settings</Heading>
      
      <Box mb={6} p={4} borderWidth="1px" borderRadius="lg">
        <Heading size="md" mb={2}>Account Status</Heading>
        <Text>
          Current Plan: <Badge colorScheme={isPro ? 'green' : 'gray'}>
            {isPro ? 'PRO' : 'FREE'}
          </Badge>
        </Text>
        {!isPro && (
          <Button
            mt={4}
            colorScheme="purple"
            onClick={handleUpgradeToPro}
          >
            Upgrade to PRO
          </Button>
        )}
      </Box>

      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Default Project Path</FormLabel>
          <Input placeholder="/path/to/projects" />
        </FormControl>
        
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Enable Notifications</FormLabel>
          <Switch defaultChecked />
        </FormControl>
        
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Dark Mode by Default</FormLabel>
          <Switch />
        </FormControl>

        {isPro && (
          <>
            <FormControl>
              <FormLabel>Custom Templates Directory</FormLabel>
              <Input placeholder="/path/to/templates" />
            </FormControl>
            
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Advanced Analytics</FormLabel>
              <Switch defaultChecked />
            </FormControl>
          </>
        )}
        
        <Button colorScheme="blue" alignSelf="flex-start">
          Save Settings
        </Button>
      </VStack>
    </Box>
  );
}

export default Settings; 