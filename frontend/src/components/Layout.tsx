import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" bg="white" _dark={{ bg: "gray.900" }}>
      {children}
    </Box>
  );
};

export default Layout;

