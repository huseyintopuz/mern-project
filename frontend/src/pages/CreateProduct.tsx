import { useState, type ChangeEvent, type FormEvent } from "react";
import { Box, Button, Input, VStack, Heading, Field } from "@chakra-ui/react";
import { toaster } from "@/utils/functions/toaster";
import { useProductStore, type ProductProps } from "@/store/store";

const CreateProduct = () => {
  const { createProduct } = useProductStore();

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
    } catch (error) {
      console.log(error);

      toaster.create({
        title: "Error",
        description: "Failed to add product. Please try again.",
        type: "error",
      });
    } finally {
      setProduct({ name: "", price: 0, imageUrl: "", description: "" });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading size="md" mb={6} textAlign="center">
        Add New Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <Field.Root required>
            <Field.Label>Product Name</Field.Label>
            <Input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Product Description</Field.Label>
            <Input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Price</Field.Label>
            <Input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Image URL</Field.Label>
            <Input
              type="url"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </Field.Root>

          <Button type="submit" colorScheme="teal" width="full">
            Add Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateProduct;
