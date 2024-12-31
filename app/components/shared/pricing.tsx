import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { SubmitButton } from "@/app/components/dashboard/submit-buttons";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out.",
    benefits: [
      "1 Site",
      "Up to 100 Visitors",
      "Full Dashboard Admin",
      "Built in authentication",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Start-Up",
    cardDescription: "The best pricing plan for people professionals.",
    benefits: [
      "Unlimited Sites",
      "Up to 1000 Visitors",
      "Full Dashboard Admin",
      "Built in authentication",
    ],
    priceTitle: "$29/month",
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Custom blog generation and administration with a budget. Simple and easy
        to use for anyone!
      </p>
      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                   <div className="flex items-center justify-between">
                    <h3 className="text-primary">StartUp</h3>
                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">Most popular</p>
                   </div>
                ) : (
                    <>
                    {item.cardTitle}
                    </>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>
              <ul className="mt-8 space-y-8 text-sm leading-6 text-muted-foreground">
            {item.benefits.map((benefit, index) => (
                <li key={index} className="flex gap-x-3">
                    <Check className="text-primary size-5" />
                    {benefit}
                </li>
            ))}
              </ul>
            </CardContent>
            <CardFooter>
                {item.id === 1 ? (
                   <form className="w-full">
                    <SubmitButton text="Buy Plan" className="mt-5 w-full"/>
                   </form>
                ):(
                    <Button variant="outline" className="mt-5 w-full">Try for Free</Button>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}