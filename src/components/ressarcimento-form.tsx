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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { relatorios } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DollarSign,
  Link,
  Loader2,
  MessageSquare,
  Search,
  Send,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  relatorio_id: z.number({
    required_error: "Por favor, vincule um relatório.",
  }),
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
  reports,
  isLoadingReports,
}: {
  onSubmit: (
    data: RessarcimentoFormData,
    resetForm: () => void,
    selectedReport: relatorios,
  ) => void;
  isSubmitting?: boolean;
  reports: relatorios[];
  isLoadingReports?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedReport, setSelectedReport] = React.useState<relatorios | null>(
    null,
  );

  const form = useForm<RessarcimentoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relatorio_id: undefined,
      value: "" as any,
      reason: "",
    },
  });

  const handleReportSelect = (report: relatorios) => {
    setSelectedReport(report);
    form.setValue("relatorio_id", report.id as number);
    setOpen(false);
  };

  const handleFormSubmit = (data: RessarcimentoFormData) => {
    if (selectedReport) {
      onSubmit(
        data,
        () => {
          form.reset();
          setSelectedReport(null);
        },
        selectedReport,
      );
    }
  };

  const filteredReports = reports
    .filter(
      (report) =>
        (report.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.veiculo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.id?.toString().includes(searchTerm)) &&
        report.categoria !== "Ressarcimento" &&
        report.categoria !== "Relatorio Nitro",
    )
    .sort((a, b) =>
      a.created_at && b.created_at
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : 0,
    )
    .slice(0, 10);

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Relatório de Ressarcimento
        </CardTitle>
        <CardDescription>
          Vincule um relatório e insira os detalhes para registrar um
          ressarcimento.
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
              name="relatorio_id"
              render={(_) => (
                <FormItem>
                  <FormLabel>Relatório Vinculado</FormLabel>
                  <FormControl>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {selectedReport
                            ? (
                              <>
                                <Link className="mr-2 h-4 w-4" />
                                {`Cliente: ${selectedReport.cliente} - Veículo: ${selectedReport.veiculo}`}
                              </>
                            )
                            : "Selecione um relatório para vincular"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Vincular Relatório</DialogTitle>
                        </DialogHeader>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Buscar por cliente, veículo ou ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <ScrollArea className="h-[400px] mt-4">
                          <div className="flex flex-col gap-2">
                            {isLoadingReports
                              ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                  <Skeleton
                                    key={i}
                                    className="h-16 w-full"
                                  />
                                ))
                              )
                              : filteredReports.length > 0
                              ? (
                                filteredReports.map((report) => (
                                  <button
                                    key={report.id}
                                    type="button"
                                    className="p-3 text-left rounded-md hover:bg-accent border"
                                    onClick={() => handleReportSelect(report)}
                                  >
                                    <p className="font-semibold">
                                      {report.cliente}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {report.veiculo} - {report.created_at
                                        ? new Date(
                                          report.created_at,
                                        ).toLocaleDateString("pt-BR")
                                        : "Data indisponível"}
                                    </p>
                                  </button>
                                ))
                              )
                              : (
                                <p className="text-center text-muted-foreground p-4">
                                  Nenhum relatório encontrado.
                                </p>
                              )}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
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
