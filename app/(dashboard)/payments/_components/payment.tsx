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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Nav } from "./nav";
import { AccountSwitcher } from "./account-switcher";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon, MegaphoneIcon } from "@/components/icons";
import { Transaction } from "../data";

interface PaymentProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  orders: Transaction[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Payment({
  accounts,
  orders,
  defaultLayout = [265, 440, 695],
  defaultCollapsed = false,
  navCollapsedSize,
}: PaymentProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const totalOrderAmount = orders.reduce(
    (total, order) => total + order.orderAmount,
    0
  );
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full items-stretch bg-gray-50"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            "bg-slate-800 flex flex-col",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out "
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2 py-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Home",
                label: "",
                icon: Home,
                variant: "primary",
              },
              {
                title: "Orders",
                label: "",
                icon: ScrollText,
                variant: "primary",
              },
              {
                title: "Products",
                label: "",
                icon: LayoutGrid,
                variant: "primary",
              },
              {
                title: "Delivery",
                label: "",
                icon: Truck,
                variant: "primary",
              },
              {
                title: "Marketing",
                label: "",
                icon: Megaphone,
                variant: "primary",
              },
              {
                title: "Analytics",
                label: "",
                icon: BarChartBig,
                variant: "primary",
              },
              {
                title: "Payments",
                label: "",
                icon: CreditCard,
                variant: "default",
              },
              {
                title: "Tools",
                label: "",
                icon: MousePointer2,
                variant: "primary",
              },
              {
                title: "Discounts",
                label: "",
                icon: BadgePercent,
                variant: "primary",
              },
              {
                title: "Audience",
                label: "",
                icon: Users2,
                variant: "primary",
              },
              {
                title: "Appearance",
                label: "",
                icon: Palette,
                variant: "primary",
              },
              {
                title: "Plugins",
                label: "",
                icon: Zap,
                variant: "primary",
              },
            ]}
          />

          <div className=" flex flex-1 flex-col mx-2 xl:mx-4 justify-end mb-5">
            <div className="flex items-center gap-3 py-1 xl:py-2 px-3 bg-gray-700 rounded-md">
              <Wallet
                color="#fff"
                className="bg-gray-600 w-10 h-10 p-1.5 rounded-lg "
              />

              <div className="flex flex-col">
                <span className="text-gray-400 text-sm xl:text-base">
                  Available credits
                </span>
                <span className="text-lg text-white">222.10</span>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div>
            <div className="bg-white flex items-center px-5 py-1  shadow-md mb-5">
              <h1 className="text-xl text-gray-700 font-semibold">Payments</h1>

              <div className="px-3 flex items-center gap-1">
                <QuestionMarkCircledIcon />
                <span className="text-sm">How it works</span>
              </div>

              <div className="flex-1 flex items-center justify-center bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form className="w-full max-w-md ">
                  <div className="relative ">
                    <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground " />
                    <Input
                      placeholder="Search features, tutorials, etc."
                      className="pl-8 bg-gray-200  placeholder:text-gray-400"
                    />
                  </div>
                </form>
              </div>

              <div className="px-3 flex items-center gap-3">
                <MegaphoneIcon />
                <ArrowDownIcon />
              </div>
            </div>

            <div className="p-5 flex items-center justify-between">
              <p className="text-xl font-semibold">Overview</p>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastweek">Last Week</SelectItem>
                  <SelectItem value="lastday">Last Day</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-8 mx-5">
              <div className="bg-white rounded-xl p-5 w-1/2">
                <p className="text-gray-500 pb-5">Online orders</p>
                <p className="text-black text-3xl">{orders.length}</p>
              </div>
              <div className="bg-white rounded-xl p-5 w-1/2">
                <p className="text-gray-500 pb-5">Amount received</p>
                <p className="text-black text-3xl">
                  ₹{totalOrderAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-semibold p-5">
              Transactions | This Month
            </h1>

            <div className="mx-5 bg-white rounded-xl">
              <DataTable data={orders} columns={columns} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
