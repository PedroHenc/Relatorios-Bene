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

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, { message: "Client name must be at least 2 characters." }),
  carModel: z
    .string()
    .min(2, { message: "Car model must be at least 2 characters." }),
  value: z.coerce
    .number({ invalid_type_error: "Please enter a valid number." })
    .positive({ message: "Value must be a positive number." }),
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
        <CardTitle className="font-headline text-2xl">Create Valuation</CardTitle>
        <CardDescription>
          Enter the client and vehicle details below.
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
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g. John Doe" {...field} className="pl-10"/>
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
                <FormItem>
                  <FormLabel>Car Model</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g. Toyota Camry" {...field} className="pl-10"/>
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
                  <FormLabel>Agreed Value</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="number" placeholder="e.g. 25000" {...field} className="pl-10" step="0.01"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-11 text-base">
              <Printer className="mr-2 h-5 w-5" />
              Save and Print
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
