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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DollarSign,
  Loader2,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, { message: "O nome do cliente deve ter pelo menos 2 caracteres." }),
  value: z.coerce
    .number({ invalid_type_error: "Por favor, insira um número válido." })
    .positive({ message: "O valor deve ser um número positivo." }),
  reason: z
    .string()
    .min(10, { message: "O motivo deve ter pelo menos 10 caracteres." }),
});

export type RessarcimentoFormData = z.infer<typeof formSchema>;

export function RessarcimentoForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: RessarcimentoFormData, resetForm: () => void) => void;
  isSubmitting?: boolean;
}) {
  const form = useForm<RessarcimentoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      value: "" as any,
      reason: "",
    },
  });

  const handleFormSubmit = (data: RessarcimentoFormData) => {
    onSubmit(data, () => form.reset());
  };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Relatório de Ressarcimento
        </CardTitle>
        <CardDescription>
          Insira os detalhes para registrar um ressarcimento.
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (R$)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="ex: 500"
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

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Descreva o motivo do ressarcimento..."
                        {...field}
                        className="pl-10"
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
