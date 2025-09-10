"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2, User } from "lucide-react";
import { Logo } from "./logo";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type Employee = {
  value: string;
  label: string;
};

type SortedGroupedEmployees = [string, Employee[]][];

export function EmployeeSelector({
  onSelect,
  employees,
  isLoading,
  isError,
}: {
  onSelect: (employee: string) => void;
  employees: SortedGroupedEmployees;
  isLoading: boolean;
  isError: boolean;
}) {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl animate-in fade-in-50 zoom-in-95">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-fit">
            <Logo className="h-20 w-20" />
          </div>
          <CardTitle className="text-2xl font-headline">
            Relatorio Benny's
          </CardTitle>
          <CardDescription>Selecione seu perfil para começar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {isError
            ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                  Não foi possível carregar a lista de funcionários.
                </AlertDescription>
              </Alert>
            )
            : (
              <Select
                value={selected}
                onValueChange={setSelected}
                disabled={isLoading}
              >
                <SelectTrigger className="h-12 text-base">
                  <div className="flex items-center">
                    {isLoading
                      ? (
                        <Loader2 className="mr-3 h-5 w-5 text-muted-foreground animate-spin" />
                      )
                      : <User className="mr-3 h-5 w-5 text-muted-foreground" />}
                    <SelectValue
                      placeholder={isLoading
                        ? "Carregando funcionários..."
                        : "Selecione um funcionário..."}
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {employees.map(([group, emps]) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {emps.map((emp) => (
                        <SelectItem
                          key={emp.value}
                          value={emp.value}
                          className="text-base py-2"
                        >
                          {emp.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            )}
          <Button
            onClick={handleSelect}
            disabled={!selected || isLoading || isError}
            className="w-full h-12 text-base"
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
