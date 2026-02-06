"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  approved: {
    label: "Approved",
    color: "green", // Green for approved
  },
  rejected: {
    label: "Rejected",
    color: "red", // Red for rejected
  },
  pending: {
    label: "Pending",
    color: "yellow", // Yellow for pending
  },
};

export function ChartPieLabelList({ data }) {
  // Generates data for the pie chart
  function generateChartData(category) {
    return [
      {
        category: "approved",
        value: data[category].approved,
        fill: chartConfig.approved.color,
      },
      {
        category: "rejected",
        value: data[category].rejected,
        fill: chartConfig.rejected.color,
      },
      {
        category: "pending",
        value: data[category].pending,
        fill: chartConfig.pending.color,
      },
    ];
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Internship Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Internship Status</CardTitle>
          <CardDescription>Registration status for Internship</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />
              <Pie data={generateChartData("internship")} dataKey="value">
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value) => chartConfig[value]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Webinar Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Webinar Status</CardTitle>
          <CardDescription>Registration status for Webinar</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />
              <Pie data={generateChartData("webinar")} dataKey="value">
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value) => chartConfig[value]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Membership Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Membership Status</CardTitle>
          <CardDescription>Registration status for Membership</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />
              <Pie data={generateChartData("membership")} dataKey="value">
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value) => chartConfig[value]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
