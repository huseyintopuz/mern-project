import { Box, Button, Container, Heading, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface HeaderProps {
  buttonText: string;
  buttonLink: string;
}

const Header = ({ buttonText, buttonLink }: HeaderProps) => {
  return (
    <Box
      bg="#131921"
      color="white"
      py={3}
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <Container maxW="7xl">
        <HStack justify="space-between" align="center">
          <Heading
            as="h1"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
          >
            Product Store
          </Heading>
          <Link to={buttonLink}>
            <Button
              size="sm"
              bg="#febd69"
              color="#131921"
              _hover={{
                bg: "#f3a847",
              }}
              borderRadius="md"
              px={4}
              fontWeight="bold"
            >
              {buttonText}
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;

