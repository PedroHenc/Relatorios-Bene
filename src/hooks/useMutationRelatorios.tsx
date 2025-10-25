import { getBenneiros, postRelatorios, sendRelatorioToDiscord, sendRelatorioToDiscordLeilao } from "@/services/sgbr-api";
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
        if (variables.leilao) {
          await sendRelatorioToDiscordLeilao(variables);
          console.log("Relatório de leilão enviado pro Discord!");
        } else {
          await sendRelatorioToDiscord(variables);
          console.log("Relatório normal enviado pro Discord!");
        }
      } catch (err) {
        console.error("Erro ao enviar relatório para o Discord:", err);
      }
    },
  });

  return {
    getBenneuiro: getBenneirosMutate,
    postRelatorio: postRelatorioMutate,
  };
};

export default useMutationRelatorios;
