"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { nitroKitOptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fuel, Loader2, Send, User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Combobox } from "./ui/combobox";

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, { message: "O nome do cliente deve ter pelo menos 2 caracteres." }),
  kit_nitro: z
    .string()
    .min(1, { message: "Por favor, selecione um kit de nitro." }),
  nitro: z.coerce
    .number({ invalid_type_error: "Por favor, insira um número válido." })
    .positive({ message: "O valor deve ser um número positivo." }),
});

export type NitroFormData = z.infer<typeof formSchema>;

export function NitroForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: NitroFormData, resetForm: () => void) => void;
  isSubmitting?: boolean;
}) {
  const form = useForm<NitroFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      kit_nitro: "",
      nitro: "" as any,
    },
  });

  const handleFormSubmit = (data: NitroFormData) => {
    onSubmit(data, () => form.reset());
  };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Relatório de Nitro
        </CardTitle>
        <CardDescription>
          Insira os detalhes para registrar a venda de nitro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ex: João da Silva"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kit_nitro"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Kit de Nitro</FormLabel>
                  <Combobox
                    options={nitroKitOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione um kit..."
                    searchPlaceholder="Procure um kit..."
                    notfoundtext="Nenhum kit encontrado."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nitro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nitro (Litros)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="ex: 10"
                        {...field}
                        className="pl-10"
                        step="0.1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                : <Send className="mr-2 h-5 w-5" />}
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
