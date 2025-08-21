"use client";

import { useState, useEffect } from "react";
import { EmployeeSelector } from "@/components/employee-selector";
import { AppHeader } from "@/components/app-header";
import { ValueCardForm, type FormData } from "@/components/value-card-form";
import { PrintLayout } from "@/components/print-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [employee, setEmployee] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formDataForPrint, setFormDataForPrint] = useState<FormData | null>(
    null
  );

  useEffect(() => {
    try {
      const storedEmployee = localStorage.getItem("selectedEmployee");
      if (storedEmployee) {
        setEmployee(storedEmployee);
      }
    } catch (error) {
      console.error("Could not access local storage", error);
    }
    setLoading(false);
  }, []);

  const handleEmployeeSelect = (selectedEmployee: string) => {
    try {
      localStorage.setItem("selectedEmployee", selectedEmployee);
      setEmployee(selectedEmployee);
    } catch (error) {
      console.error("Could not write to local storage", error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("selectedEmployee");
      setEmployee(null);
    } catch (error) {
      console.error("Could not remove from local storage", error);
    }
  };

  const handleFormSubmit = (data: FormData) => {
    setFormDataForPrint(data);
    setTimeout(() => {
      window.print();
      setFormDataForPrint(null);
    }, 100);
  };

  if (loading) {
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
    return <EmployeeSelector onSelect={handleEmployeeSelect} />;
  }

  return (
    <>
      <div className="print:hidden flex flex-col min-h-screen bg-background">
        <AppHeader employee={employee} onLogout={handleLogout} />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <ValueCardForm onSubmit={handleFormSubmit} />
        </main>
      </div>
      {formDataForPrint && <PrintLayout data={formDataForPrint} employee={employee} />}
    </>
  );
}
