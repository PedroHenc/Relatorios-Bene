import type { FormData } from "./value-card-form";
import { Logo } from "./logo";

export function PrintLayout({
  data,
  employee,
}: {
  data: FormData;
  employee: string;
}) {
  return (
    <div className="hidden print:block font-sans text-gray-800 p-10">
      <header className="flex justify-between items-center pb-6 border-b-2 border-gray-900">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-gray-900" />
          <h1 className="text-3xl font-bold">Auto Value Link</h1>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">{employee}</p>
          <p className="text-sm text-gray-600">
            Date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>
      <main className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Valuation Details
        </h2>
        <div className="grid grid-cols-[150px_1fr] gap-x-8 gap-y-5 text-lg">
          <div className="font-semibold">Client Name:</div>
          <div className="border-b pb-2">{data.clientName}</div>

          <div className="font-semibold">Car Model:</div>
          <div className="border-b pb-2">{data.carModel}</div>

          <div className="font-semibold">Agreed Value:</div>
          <div className="border-b pb-2 font-mono font-bold text-xl">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.value)}
          </div>
        </div>

        <div className="mt-16 space-y-12">
            <div className="w-1/2">
                <div className="w-full border-t border-gray-400 pt-2 text-center text-sm">
                    Client Signature
                </div>
            </div>
             <div className="w-1/2 ml-auto">
                <div className="w-full border-t border-gray-400 pt-2 text-center text-sm">
                    Employee Signature
                </div>
            </div>
        </div>

      </main>
      <footer className="mt-24 pt-6 border-t text-center text-gray-500 text-sm">
        <p>Thank you for your business.</p>
        <p>Auto Value Link &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
