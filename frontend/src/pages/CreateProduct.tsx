import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Field,
  Container,
  Text,
} from "@chakra-ui/react";
import { toaster } from "@/utils/functions/toaster";
import { useProductStore, type ProductProps } from "@/store/store";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Layout from "@/components/Layout";

const CreateProduct = () => {
  const { createProduct } = useProductStore();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductProps>({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "price",
      "imageUrl",
      "description",
    ] as const;
    const isEmpty = requiredFields.some((field) => !product[field]);

    if (isEmpty) {
      toaster.create({
        title: "Error",
        description: "Please fill in all fields.",
        type: "error",
      });
      return;
    }

    try {
      await createProduct(product);
      toaster.create({
        title: "Product Added",
        description: `${product.name} has been added successfully!`,
        type: "success",
      });
      setProduct({ name: "", price: 0, imageUrl: "", description: "" });
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error);

      toaster.create({
        title: "Error",
        description: "Failed to add product. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <Layout>
      <Header buttonText="Back to Store" buttonLink="/" />

      <Box bg="#eaeded" _dark={{ bg: "gray.800" }} minH="calc(100vh - 60px)">
        <Container maxW="7xl" py={8}>
          <Box
            maxW="600px"
            mx="auto"
            bg="white"
            _dark={{ bg: "gray.700", borderColor: "gray.600" }}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            p={8}
          >
            <VStack gap={6} align="start" w="full">
              <Box>
                <Heading size="xl" mb={2} color="gray.900" _dark={{ color: "white" }}>
                  Add New Product
                </Heading>
                <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  Fill in the details below to add a new product to your store
                </Text>
              </Box>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <VStack gap={5} w="full">
                  <Field.Root required w="full">
                    <Field.Label
                      fontSize="sm"
                      fontWeight="bold"
                      color="gray.900"
                      _dark={{ color: "white" }}
                    >
                      Product Name
                    </Field.Label>
                    <Input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      size="lg"
                      borderRadius="md"
                      _focus={{
                        borderColor: "#007185",
                        boxShadow: "0 0 0 3px rgba(0, 113, 133, 0.1)",
                      }}
                    />
                  </Field.Root>

                  <Field.Root required w="full">
                    <Field.Label
                      fontSize="sm"
                      fontWeight="bold"
                      color="gray.900"
                      _dark={{ color: "white" }}
                    >
                      Description
                    </Field.Label>
                    <Input
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      size="lg"
                      borderRadius="md"
                      _focus={{
                        borderColor: "#007185",
                        boxShadow: "0 0 0 3px rgba(0, 113, 133, 0.1)",
                      }}
                    />
                  </Field.Root>

                  <Field.Root required w="full">
                    <Field.Label
                      fontSize="sm"
                      fontWeight="bold"
                      color="gray.900"
                      _dark={{ color: "white" }}
                    >
                      Price ($)
                    </Field.Label>
                    <Input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      size="lg"
                      borderRadius="md"
                      step="0.01"
                      _focus={{
                        borderColor: "#007185",
                        boxShadow: "0 0 0 3px rgba(0, 113, 133, 0.1)",
                      }}
                    />
                  </Field.Root>

                  <Field.Root required w="full">
                    <Field.Label
                      fontSize="sm"
                      fontWeight="bold"
                      color="gray.900"
                      _dark={{ color: "white" }}
                    >
                      Image URL
                    </Field.Label>
                    <Input
                      type="url"
                      name="imageUrl"
                      value={product.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      size="lg"
                      borderRadius="md"
                      _focus={{
                        borderColor: "#007185",
                        boxShadow: "0 0 0 3px rgba(0, 113, 133, 0.1)",
                      }}
                    />
                  </Field.Root>

                  <Button
                    type="submit"
                    width="full"
                    size="lg"
                    bg="#febd69"
                    color="#131921"
                    _hover={{
                      bg: "#f3a847",
                    }}
                    borderRadius="md"
                    fontWeight="bold"
                    mt={2}
                  >
                    Add Product to Store
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default CreateProduct;
