import { cookies } from "next/headers";
import Image from "next/image";
import { Payment } from "./_components/payment";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { accounts, orderSchema } from "./data";
import { PaymentMobile } from "./_components/payment-mobile";
async function getTransactions() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(dashboard)/payments/tasks.json")
  );

  const transactions = JSON.parse(data.toString());

  return z.array(orderSchema).parse(transactions);
}
export default async function PaymentsPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const orders = await getTransactions();

  return (
    <>
      <div className="flex-col sm:hidden w-full h-full">
        <PaymentMobile accounts={accounts} orders={orders} />
      </div>

      <div className="hidden flex-col sm:flex  w-full h-full">
        <Payment
          accounts={accounts}
          orders={orders}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
