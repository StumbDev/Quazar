import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Divider,
} from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleLocalLogin = () => {
    const mockUser = {
      uid: 'local-user',
      email: 'local@quazar.dev',
      displayName: 'Local User',
    };
    
    useAuthStore.setState({
      user: mockUser,
      isPro: true,
      loading: false,
      error: null
    });

    toast({
      title: 'Local Mode Activated',
      description: 'You are now using Quazar in local mode',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
      </form>

      <Divider my={6} />

      <Button
        onClick={handleLocalLogin}
        colorScheme="green"
        width="full"
        variant="outline"
      >
        Continue Locally (No Authentication)
      </Button>
      <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
        Use local mode for development without Firebase
      </Text>
    </Box>
  );
}

export default Login; 