import ProductList from "@/components/ProductList";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { Box, Container } from "@chakra-ui/react";

const Home = () => {
  return (
    <Layout>
      <Header buttonText="Add Product" buttonLink="/createproduct" />
      <Box bg="#eaeded" _dark={{ bg: "gray.800" }} minH="calc(100vh - 60px)">
        <Container maxW="7xl" py={6}>
          <ProductList />
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
