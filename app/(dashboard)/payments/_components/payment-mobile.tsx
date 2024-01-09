"use client";
import * as React from "react";
import {
  BadgePercent,
  BarChartBig,
  CreditCard,
  Home,
  LayoutGrid,
  Megaphone,
  MousePointer2,
  Palette,
  ScrollText,
  Search,
  Truck,
  Users2,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Nav } from "./nav";
import { Transaction } from "../data";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { usePathname } from "next/navigation";
import { AccountSwitcher } from "./account-switcher";
import { MobileHeader } from "./mobile-header";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface PaymentProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  orders: Transaction[];
}

export function PaymentMobile({ accounts, orders }: PaymentProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  const totalOrderAmount = orders.reduce(
    (total, order) => total + order.orderAmount,
    0
  );
  return (
    <>
      <MobileHeader accounts={accounts} />
      <div className="bg-gray-50 flex flex-col px-5 mb-5">
        <div className="flex items-center py-3">
          <h1 className="text-xl text-gray-700 font-semibold">Payments</h1>

          <div className="px-3 flex items-center gap-1">
            <QuestionMarkCircledIcon />
            <span className="text-sm">How it works</span>
          </div>
        </div>

        <div className=" flex items-center w-full  bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form className="w-full ">
            <div className="relative w-full ">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground " />
              <Input
                placeholder="Search features, tutorials, etc."
                className="pl-8 bg-gray-200  placeholder:text-gray-400 "
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-between py-5 ">
          <p className="text-xl font-semibold">Overview</p>

          <Select>
            <SelectTrigger className="w-[135px] border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground text-black ">
              <SelectValue placeholder="Last Month" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastweek">Last Week</SelectItem>
              <SelectItem value="lastday">Last Day</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 ">
          <div className="bg-white rounded-xl p-5 w-full shadow-sm border-[0.5px] border-gray-50">
            <p className="text-gray-500 pb-5">Online orders</p>
            <p className="text-black text-3xl">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 w-full shadow-sm border-[0.5px] border-gray-50">
            <p className="text-gray-500 pb-5">Amount received</p>
            <p className="text-black text-3xl">
              ₹{totalOrderAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <h1 className="text-xl font-semibold py-5">
          Transactions | This Month
        </h1>

        <div className=" bg-white rounded-xl overflow-x-scroll">
          <DataTable data={orders} columns={columns} />
        </div>
      </div>
    </>
  );
}
