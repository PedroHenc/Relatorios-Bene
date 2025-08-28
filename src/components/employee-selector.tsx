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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import { Logo } from "./logo";

const employees = ["Sophia Turner", "Liam Green", "Olivia Chen", "Noah Patel"];

export function EmployeeSelector({
  onSelect,
}: {
  onSelect: (employee: string) => void;
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
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="h-12 text-base">
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="Selecione um funcionário..." />
              </div>
            </SelectTrigger>
            <SelectContent>
              {employees.map((emp) => (
                <SelectItem key={emp} value={emp} className="text-base py-2">
                  {emp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleSelect}
            disabled={!selected}
            className="w-full h-12 text-base"
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
