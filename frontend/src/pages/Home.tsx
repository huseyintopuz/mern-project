import ProductList from "@/components/ProductList";
import { useProductStore } from "@/store/store";
import { Button, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  const { products } = useProductStore();
  console.log(products);
  return (
    <Container>
      <Link to="/createproduct">
        <Button bgColor={"blue.500"} _hover={{ bg: "blue.600" }}>
          Add new product
        </Button>
      </Link>
      <ProductList />
    </Container>
  );
};

export default Home;
