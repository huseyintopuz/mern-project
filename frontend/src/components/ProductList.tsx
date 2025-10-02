"use client";

import { useProducts } from "@/hooks/useProducts";
import { useProductStore, type ProductProps } from "@/store/store";
import { toaster } from "@/utils/functions/toaster";
import { Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
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
    } catch {
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
    } catch {
      toaster.create({
        title: "Error",
        description: "Failed to update product. Please try again.",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <Box>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {products?.map((product: ProductProps) => (
          <ProductCard
            key={product._id}
            product={product}
            isEditing={editingId === product._id}
            editValues={editValues}
            onEditClick={handleEditClick}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
            onEditChange={setEditValues}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
