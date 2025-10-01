// hooks/useProducts.ts
import useSWR from "swr";
import { useProductStore } from "@/store/store";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useProducts = () => {
    const { data, error, mutate } = useSWR("/api/products", fetcher);

    const setProducts = useProductStore((state) => state.setProducts);

    // SWR’den gelen veriyi Zustand’a kopyala
    useEffect(() => {
        if (data) {
            setProducts(data.data || []);
        }
    }, [data, setProducts]);

    return {
        products: data?.data || [],
        isLoading: !data && !error,
        isError: !!error,
        mutate, // mutate ile SWR cache’i güncelleyebilirsin
    };
};
