"use client";

import { AppHeader } from "@/components/app-header";
import { EmployeeSelector } from "@/components/employee-selector";
import { PrintLayout } from "@/components/print-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { type FormData, ValueCardForm } from "@/components/value-card-form";
import { getBenneiros } from "@/services/sgbr-api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [employee, setEmployee] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);
  const [formDataForPrint, setFormDataForPrint] = useState<FormData | null>(
    null,
  );

  const {
    data: benneiroData,
    isLoading: benneirosLoading,
    isError: benneirosError,
  } = useQuery({
    queryKey: ["benneiros"],
    queryFn: getBenneiros,
  });

  const employees = benneiroData?.data.map((b: { id: number; nome: string }) => ({
    value: b.nome,
    label: b.nome,
  })) || [];

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

  const handleFormSubmit = (data: FormData) => {
    setFormDataForPrint(data);
    setTimeout(() => {
      window.print();
      setFormDataForPrint(null);
    }, 100);
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
        employees={employees}
        isLoading={benneirosLoading}
        isError={benneirosError}
      />
    );
  }

  return (
    <>
      <div className="print:hidden flex flex-col min-h-screen bg-background">
        <AppHeader employee={employee} onLogout={handleLogout} />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <ValueCardForm onSubmit={handleFormSubmit} />
        </main>
      </div>
      {formDataForPrint && (
        <PrintLayout data={formDataForPrint} employee={employee} />
      )}
    </>
  );
}
