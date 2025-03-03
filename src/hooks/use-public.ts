import useAxios from "@/api/client";
import { PublicForm } from "@/api/public";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export const usePublicForm = () => {

  const axios = useAxios();
  const { id } = useParams({ from: '/pub/form/$id' })

  const getPublicForm = async () => {
    const response = await axios.get<{ data: PublicForm }>(`/forms/public/${id}`);
    return response.data.data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["public-form", id],
    queryFn: () => getPublicForm(),
  });

  return { data, isLoading, error };
};

export const usePublicFormReaction = () => {
  const axios = useAxios();
  const { id } = useParams({ from: '/pub/form/$id' })

  const reactToForm = async (data: {
    name: string;
    phone: string;
    address: string;
    comments: string;
    points: number;
  }) => {
    const response = await axios.post(`/forms/public/${id}/feedback`, data);
    if (response.status === 201) {
      return { success: true, error: null }
    }
    return { success: false, error: response.data.message };
  };

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: reactToForm,
  });

  return { mutateAsync, isPending, error };
};
