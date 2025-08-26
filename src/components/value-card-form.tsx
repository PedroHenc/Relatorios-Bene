"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, User, DollarSign, Printer } from "lucide-react";
import { Combobox } from "./ui/combobox";

const carModels = [
  { label: "Toyota Corolla", value: "Toyota Corolla" },
  { label: "Honda Civic", value: "Honda Civic" },
  { label: "Ford Focus", value: "Ford Focus" },
  { label: "Chevrolet Onix", value: "Chevrolet Onix" },
  { label: "Hyundai HB20", value: "Hyundai HB20" },
  { label: "Volkswagen Gol", value: "Volkswagen Gol" },
  { label: "Fiat Argo", value: "Fiat Argo" },
  { label: "Renault Sandero", value: "Renault Sandero" },
  { label: "Jeep Renegade", value: "Jeep Renegade" },
  { label: "Nissan Kicks", value: "Nissan Kicks" },
];

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, { message: "O nome do cliente deve ter pelo menos 2 caracteres." }),
  carModel: z
    .string()
    .min(2, { message: "O modelo do carro deve ter pelo menos 2 caracteres." }),
  value: z.coerce
    .number({ invalid_type_error: "Por favor, insira um número válido." })
    .positive({ message: "O valor deve ser um número positivo." }),
});

export type FormData = z.infer<typeof formSchema>;

export function ValueCardForm({
  onSubmit,
}: {
  onSubmit: (data: FormData) => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      carModel: "",
      value: undefined,
    },
  });

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Criar Avaliação</CardTitle>
        <CardDescription>
          Insira os detalhes do cliente e do veículo abaixo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="ex: João da Silva" {...field} className="pl-10"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carModel"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Modelo do Carro</FormLabel>
                  <Combobox
                    options={carModels}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione um modelo..."
                    searchPlaceholder="Procure um modelo..."
                    notfoundtext="Nenhum modelo encontrado."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Acordado</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="number" placeholder="ex: 25000" {...field} className="pl-10" step="0.01"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-11 text-base">
              <Printer className="mr-2 h-5 w-5" />
              Salvar e Imprimir
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
