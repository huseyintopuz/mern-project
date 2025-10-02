import { useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { type ProductProps } from "@/store/store";

interface ProductCardProps {
  product: ProductProps;
  isEditing: boolean;
  editValues: Partial<ProductProps>;
  onEditClick: (product: ProductProps) => void;
  onDelete: (product: ProductProps) => void;
  onUpdate: () => void;
  onCancel: () => void;
  onEditChange: (values: Partial<ProductProps>) => void;
}

const ProductCard = ({
  product,
  isEditing,
  editValues,
  onEditClick,
  onDelete,
  onUpdate,
  onCancel,
  onEditChange,
}: ProductCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.700", borderColor: "gray.600" }}
      borderRadius="md"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      _hover={{
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
      transition="box-shadow 0.2s"
    >
      {isEditing ? (
        <VStack gap={2} p={4}>
          <Input
            value={editValues.name}
            onChange={(e) =>
              onEditChange({ ...editValues, name: e.target.value })
            }
            placeholder="Name"
            size="sm"
          />
          <Input
            type="number"
            value={editValues.price}
            onChange={(e) =>
              onEditChange({
                ...editValues,
                price: Number(e.target.value),
              })
            }
            placeholder="Price"
            size="sm"
          />
          <Input
            value={editValues.description}
            onChange={(e) =>
              onEditChange({
                ...editValues,
                description: e.target.value,
              })
            }
            placeholder="Description"
            size="sm"
          />
          <HStack gap={2} w="full" mt={2}>
            <Button
              flex={1}
              size="sm"
              bg="#febd69"
              color="#131921"
              _hover={{ bg: "#f3a847" }}
              onClick={onUpdate}
            >
              Save
            </Button>
            <Button
              flex={1}
              size="sm"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      ) : (
        <HStack align="start" gap={3} p={4}>
          {/* Image Section */}
          <Box flexShrink={0} w="120px" h="120px" bg="white" borderRadius="md">
            <Image
              src={
                imgError ? "https://via.placeholder.com/120" : product.imageUrl
              }
              alt={product.name}
              w="120px"
              h="120px"
              objectFit="contain"
              onError={() => setImgError(true)}
            />
          </Box>

          {/* Content Section */}
          <VStack align="start" gap={1} flex={1} minW={0}>
            <Text
              fontSize="sm"
              fontWeight="normal"
              color="#007185"
              _dark={{ color: "blue.300" }}
              textOverflow="ellipsis"
              overflow="hidden"
              css={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              _hover={{ color: "#C7511F", textDecoration: "underline" }}
              cursor="pointer"
            >
              {product.name}
            </Text>

            <HStack gap={1} align="baseline">
              <Text fontSize="xs" color="gray.600">
                $
              </Text>
              <Text
                fontSize="xl"
                fontWeight="normal"
                color="gray.900"
                _dark={{ color: "white" }}
              >
                {Math.floor(product.price)}
              </Text>
              <Text
                fontSize="xs"
                color="gray.600"
                position="relative"
                top="-2px"
              >
                {((product.price % 1) * 100).toFixed(0).padStart(2, "0")}
              </Text>
            </HStack>

            <Text
              fontSize="xs"
              color="gray.600"
              _dark={{ color: "gray.400" }}
              textOverflow="ellipsis"
              overflow="hidden"
              css={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.description}
            </Text>

            {/* Action Buttons */}
            <HStack gap={2} mt={2} w="full">
              <Button
                size="xs"
                variant="ghost"
                color="#007185"
                onClick={() => onEditClick(product)}
                fontSize="xs"
                p={0}
                h="auto"
                minW="auto"
                _hover={{ textDecoration: "underline", bg: "transparent" }}
              >
                Edit
              </Button>
              <Text fontSize="xs" color="gray.300">
                |
              </Text>
              <Button
                size="xs"
                variant="ghost"
                color="#007185"
                onClick={() => onDelete(product)}
                fontSize="xs"
                p={0}
                h="auto"
                minW="auto"
                _hover={{ textDecoration: "underline", bg: "transparent" }}
              >
                Delete
              </Button>
            </HStack>
          </VStack>
        </HStack>
      )}
    </Box>
  );
};

export default ProductCard;

