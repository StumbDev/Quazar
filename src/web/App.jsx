import React, { useEffect } from 'react';
import { Box, Container, Heading, VStack, Button, useColorMode } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import useAuthStore from './store/authStore';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Login from './components/auth/Login';
import Playground from './components/Playground';
import QuazarAI from './components/AI/QuazarAI';
import CodeBoard from './components/CodeBoard/CodeBoard';

function PrivateRoute({ children }) {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        logout();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Box minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Heading
                size="xl"
                bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
                bgClip="text"
              >
                Quazar Web UI
              </Heading>
              <Box>
                {user && (
                  <Button onClick={logout} mr={4} colorScheme="red">
                    Logout
                  </Button>
                )}
                <Button onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
              </Box>
            </Box>

            {user && (
              <Box display="flex" gap={4}>
                <Button as={Link} to="/" colorScheme="blue">
                  Dashboard
                </Button>
                <Button as={Link} to="/playground" colorScheme="orange">
                  Playground
                </Button>
                <Button as={Link} to="/codeboard" colorScheme="teal">
                  CodeBoard
                </Button>
                <Button as={Link} to="/settings" colorScheme="purple">
                  Settings
                </Button>
              </Box>
            )}

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/playground"
                element={
                  <PrivateRoute>
                    <Playground />
                  </PrivateRoute>
                }
              />
              <Route
                path="/codeboard"
                element={
                  <PrivateRoute>
                    <CodeBoard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </VStack>
        </Container>
        <QuazarAI />
      </Box>
    </Router>
  );
}

export default App; 