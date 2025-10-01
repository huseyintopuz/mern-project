"use client";

import { useProducts } from "@/hooks/useProducts";
import { useProductStore, type ProductProps } from "@/store/store";
import { toaster } from "@/utils/functions/toaster";
import {
  Box,
  Grid,
  Image,
  Text,
  VStack,
  Heading,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const ProductList = () => {
  const [imgError, setImgError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ProductProps>>({});
  const { products, isLoading, isError } = useProducts();
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDelete = async (product: ProductProps) => {
    try {
      await deleteProduct(product._id!);
      toaster.create({
        title: "Product Deleted",
        description: `Product "${product.name}" has been deleted successfully!`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        type: "error",
      });
    }
  };

  const handleEditClick = (product: ProductProps) => {
    setEditingId(product._id!);
    setEditValues({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await updateProduct(editingId, editValues);
      toaster.create({
        title: "Product Updated",
        description: `Product "${editValues.name}" has been updated successfully!`,
        type: "success",
      });
      setEditingId(null);
      setEditValues({});
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to update product. Please try again.",
        type: "error",
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <Box maxW="6xl" mx="auto" mt={10} px={4}>
      <Heading size="lg" mb={6} textAlign="center">
        Product List
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {products?.map((product: ProductProps) => (
          <Box
            key={product._id}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={
                imgError ? "https://via.placeholder.com/200" : product.imageUrl
              }
              alt={product.name}
              boxSize="200px"
              objectFit="cover"
              mx="auto"
              mt={4}
              onError={() => setImgError(true)}
            />
            <VStack gap={2} p={4}>
              {editingId === product._id ? (
                <>
                  <Input
                    value={editValues.name}
                    onChange={(e) =>
                      setEditValues({ ...editValues, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                  <Input
                    type="number"
                    value={editValues.price}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="Price"
                  />
                  <Input
                    value={editValues.description}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                  />
                  <HStack gap={2} pt={2}>
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={handleUpdate}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="gray"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </>
              ) : (
                <>
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text color="teal.600">${product.price}</Text>
                  <Text>{product.description}</Text>
                  <HStack gap={2} pt={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </>
              )}
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
