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
import { escapeOptions as escapeOptionsList, veiculosKK } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, FileText, Loader2, Send, User, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Combobox } from "./ui/combobox";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const carModels = veiculosKK.map((model) => ({
  label: model.nome,
  value: model.nome,
}));

const escapeOptions = escapeOptionsList.map((escape) => ({
  label: escape,
  value: escape,
}));

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, { message: "O nome do cliente deve ter pelo menos 2 caracteres." }),
  cpf: z.string().optional(),
  escape: z.string().optional(),
  carModel: z
    .string()
    .min(1, { message: "Por favor, selecione um modelo de carro." }),
  value: z.coerce
    .number({ invalid_type_error: "Por favor, insira um número válido." })
    .positive({ message: "O valor deve ser um número positivo." }),
  reportType: z.enum(["normal", "leilao"]),
});

export type FormData = z.infer<typeof formSchema>;

export function ValueCardForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: FormData, resetForm: () => void) => void;
  isSubmitting?: boolean;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      cpf: "",
      carModel: undefined,
      value: "" as any,
      reportType: "normal",
    },
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data, () => form.reset());
  };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Relatorio</CardTitle>
        <CardDescription>
          Insira os detalhes abaixo para gerar o relatório.
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
              name="reportType"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Tipo de Relatório</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Relatório{" "}
                      <span className="font-semibold text-foreground">
                        {field.value === "normal" ? "Normal" : "Leilão"}
                      </span>
                    </p>
                  </div>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor="report-type-switch"
                        className="text-muted-foreground"
                      >
                        Normal
                      </Label>
                      <Switch
                        id="report-type-switch"
                        checked={field.value === "leilao"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "leilao" : "normal")}
                      />
                      <Label
                        htmlFor="report-type-switch"
                        className="text-muted-foreground"
                      >
                        Leilão
                      </Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
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
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="000.000.000-00"
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
              name="escape"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <FormLabel>Escape</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7"
                      onClick={() => form.setValue("escape", "")}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Limpar
                    </Button>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Combobox
                        options={escapeOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecione um escape..."
                        searchPlaceholder="Procure um escape..."
                        notfoundtext="Nenhum escape encontrado."
                      />
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
                    onChange={(value) => field.onChange(value)}
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
                  <FormLabel>Lucro</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="ex: 25000"
                        {...field}
                        className="pl-10"
                        step="0.01"
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
