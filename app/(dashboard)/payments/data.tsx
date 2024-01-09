import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { z } from "zod";

export const orderSchema = z.object({
  orderId: z.string(),
  orderDate: z.string(),
  orderAmount: z.number(),
  transactionFee: z.number(),
});

export type Transaction = z.infer<typeof orderSchema>;

export const priorities = [
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
];

export const accounts = [
  {
    label: "Nishyan",
    email: "nishyan@example.com",
    storeUrl: "storeurl.com",
    icon: "/images/Image.png",
  },
  {
    label: "Alicia Koch",
    email: "alicia@gmail.com",
    icon: "/images/Image.png",
  },
  {
    label: "Alicia Koch",
    email: "alicia@me.com",
    icon: "/images/Image.png",
  },
];

export type Account = (typeof accounts)[number];
