"use client";

import { AppHeader } from "@/components/app-header";
import { EmployeeSelector } from "@/components/employee-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { type FormData, ValueCardForm } from "@/components/value-card-form";
import { useToast } from "@/hooks/use-toast";
import useMutationRelatorios from "@/hooks/useMutationRelatorios";
import { getBenneiros } from "@/services/sgbr-api";
import { Benneiro } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [employee, setEmployee] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);

  const { toast } = useToast();
  const { postRelatorio } = useMutationRelatorios();

  const {
    data: benneiroData,
    isLoading: benneirosLoading,
    isError: benneirosError,
  } = useQuery<{ data: Benneiro[] }>({
    queryKey: ["benneiros"],
    queryFn: getBenneiros,
  });

  const groupedEmployees = benneiroData?.data.reduce(
    (acc, b) => {
      const { cargo, nome } = b;
      if (!acc[cargo]) {
        acc[cargo] = [];
      }
      acc[cargo].push({ value: nome, label: nome });
      return acc;
    },
    {} as Record<string, { value: string; label: string }[]>,
  );

  const sortedGroupedEmployees = groupedEmployees
    ? Object.entries(groupedEmployees).sort(([groupA], [groupB]) => {
      const order = ["Presidência", "Gerência"];
      const indexA = order.indexOf(groupA);
      const indexB = order.indexOf(groupB);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) {
        return -1;
      }
      if (indexB !== -1) {
        return 1;
      }
      return groupA.localeCompare(groupB);
    })
    : [];

  useEffect(() => {
    try {
      const storedEmployee = localStorage.getItem("selectedEmployee");
      if (storedEmployee) {
        setEmployee(storedEmployee);
      }
    } catch (error) {
      console.error("Não foi possível acessar o armazenamento local", error);
    }
    setAppLoading(false);
  }, []);

  const handleEmployeeSelect = (selectedEmployee: string) => {
    try {
      localStorage.setItem("selectedEmployee", selectedEmployee);
      setEmployee(selectedEmployee);
    } catch (error) {
      console.error("Não foi possível gravar no armazenamento local", error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("selectedEmployee");
      setEmployee(null);
    } catch (error) {
      console.error("Não foi possível remover do armazenamento local", error);
    }
  };

  const handleFormSubmit = (data: FormData, resetForm: () => void) => {
    const selectedEmployeeData = benneiroData?.data.find(
      (b) => b.nome === employee,
    );

    if (!selectedEmployeeData) {
      toast({
        title: "Erro",
        description: "Funcionário selecionado não encontrado.",
        variant: "destructive",
      });
      return;
    }

    const relatorioData = {
      beneiro_id: selectedEmployeeData.id,
      cliente: data.clientName,
      cpf: data.cpf ? Number(data.cpf.replace(/\D/g, "")) : undefined,
      lucro: data.value,
      categoria: `Relatorio ${selectedEmployeeData.cargo}`,
      created_by: employee,
      veiculo: data.carModel,
      leilao: data.reportType === "leilao",
    };

    postRelatorio.mutate(relatorioData, {
      onSuccess: () => {
        toast({
          title: "Sucesso!",
          description: "Relatório enviado com sucesso.",
        });
        resetForm();
      },
      onError: (error) => {
        toast({
          title: "Erro ao enviar",
          description: "Não foi possível enviar o relatório. Tente novamente.",
          variant: "destructive",
        });
        console.error("Erro ao enviar relatório:", error);
      },
    });
  };

  if (appLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <EmployeeSelector
        onSelect={handleEmployeeSelect}
        employees={sortedGroupedEmployees}
        isLoading={benneirosLoading}
        isError={benneirosError}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader employee={employee} onLogout={handleLogout} />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <ValueCardForm
          onSubmit={handleFormSubmit}
          isSubmitting={postRelatorio.isPending}
        />
      </main>
    </div>
  );
}
