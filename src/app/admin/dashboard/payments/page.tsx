import { Search, Filter, Download } from "lucide-react";
import AnalyticsChart from "@/components/admin/AnalyticsCharts";

const PAYMENTS = [
  { id: "TX-9988", user: "Kwame Mensah", amount: "20.00", date: "Oct 24, 2023", method: "Mobile Money", status: "completed" },
  { id: "TX-9989", user: "John Doe", amount: "50.00", date: "Oct 24, 2023", method: "Card", status: "completed" },
  { id: "TX-9990", user: "Ama Osei", amount: "20.00", date: "Oct 23, 2023", method: "Mobile Money", status: "failed" },
  { id: "TX-9991", user: "Abena Koomson", amount: "100.00", date: "Oct 22, 2023", method: "Mobile Money", status: "completed" },
  { id: "TX-9992", user: "Kofi Annan", amount: "20.00", date: "Oct 21, 2023", method: "Card", status: "completed" },
];

const REVENUE_DATA = [
    { date: "Mon", revenue: 1200 },
    { date: "Tue", revenue: 2100 },
    { date: "Wed", revenue: 800 },
    { date: "Thu", revenue: 1600 },
    { date: "Fri", revenue: 2300 },
    { date: "Sat", revenue: 3400 },
    { date: "Sun", revenue: 2800 },
];

const PAYMENT_METHODS_DATA = [
    { name: "Mobile Money", value: 75 },
    { name: "Credit Card", value: 20 },
    { name: "Bank Transfer", value: 5 },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-zinc-400">View and manage system transactions.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

       <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <AnalyticsChart 
                title="Weekly Revenue" 
                type="bar" 
                data={REVENUE_DATA} 
                categoryKey="date" 
                dataKey="revenue"
                color="#10b981"
            />
        </div>
        <div>
            <AnalyticsChart 
                title="Payment Methods" 
                type="pie" 
                data={PAYMENT_METHODS_DATA} 
                categoryKey="name" 
                dataKey="value"
            />
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 border border-zinc-700">
          <Search className="h-4 w-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search transaction ID, user..." 
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Amount (₵)</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-zinc-800/50 text-white">
                  <td className="px-6 py-4 font-mono text-xs">{payment.id}</td>
                  <td className="px-6 py-4">{payment.user}</td>
                  <td className="px-6 py-4 font-semibold">{payment.amount}</td>
                  <td className="px-6 py-4 text-zinc-500">{payment.date}</td>
                  <td className="px-6 py-4">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        payment.status === "completed"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
