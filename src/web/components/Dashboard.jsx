import React from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';

function Dashboard() {
  return (
    <Box>
      <Heading size="lg" mb={6}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Total Projects</StatLabel>
          <StatNumber>12</StatNumber>
          <StatHelpText>Active projects</StatHelpText>
        </Stat>
        <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Recent Activities</StatLabel>
          <StatNumber>24</StatNumber>
          <StatHelpText>Last 7 days</StatHelpText>
        </Stat>
        <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>System Status</StatLabel>
          <StatNumber>Healthy</StatNumber>
          <StatHelpText>All systems operational</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard; 