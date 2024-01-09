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
import { ArrowDownIcon, MegaphoneIcon } from "@/components/icons";

interface PaymentProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
}

export function MobileHeader({ accounts }: PaymentProps) {
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

  return (
    <div className="flex w-full items-center justify-between p-2 bg-slate-800 shadow-md">
      <div className="flex  items-center justify-center">
        <AccountSwitcher isCollapsed={false} accounts={accounts} />
      </div>

      <div className=" flex items-center gap-1">
        <MegaphoneIcon />
        <ArrowDownIcon />
        <Button
          onClick={onOpen}
          className="block md:hidden"
          variant="ghost"
          size="sm"
        >
          <Menu className="h-5 w-5" color="#fff" />
        </Button>
      </div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10 bg-slate-800">
          <Nav
            isCollapsed={false}
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
