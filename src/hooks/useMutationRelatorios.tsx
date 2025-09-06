import { getBenneiros, postRelatorios } from "@/services/sgbr-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMutationRelatorios = () => {
  const queryClient = useQueryClient();

  const getBenneirosMutate = useMutation({
    mutationFn: getBenneiros,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["benneiros"] });
    },
  });

  const postRelatorioMutate = useMutation({
    mutationFn: postRelatorios,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relatorios"] });
    },
  });

  return {
    getBenneuiro: getBenneirosMutate,
    postRelatorio: postRelatorioMutate,
  };
};

export default useMutationRelatorios;
