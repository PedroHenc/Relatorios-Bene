import { getBenneiros, postRelatorios, sendRelatorioToDiscord } from "@/services/sgbr-api";
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
  onSuccess: async (data, variables) => {
    queryClient.invalidateQueries({ queryKey: ["relatorios"] });

    try {
      await sendRelatorioToDiscord(variables);
      console.log("Relatório enviado pro Discord!");
    } catch (err) {
      console.error(err);
    }
  },
});

  return {
    getBenneuiro: getBenneirosMutate,
    postRelatorio: postRelatorioMutate,
  };
};

export default useMutationRelatorios;
