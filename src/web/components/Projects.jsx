import React from 'react';
import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Button } from '@chakra-ui/react';

function Projects() {
  const projects = [
    { id: 1, name: 'React App', type: 'react', status: 'active' },
    { id: 2, name: 'Vue Dashboard', type: 'vue', status: 'pending' },
    { id: 3, name: 'Node API', type: 'node', status: 'completed' }
  ];

  return (
    <Box>
      <Heading size="lg" mb={6}>Projects</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <Heading size="md">{project.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>Type: {project.type}</Text>
              <Text>Status: {project.status}</Text>
              <Button mt={4} colorScheme="blue">View Details</Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Projects; 