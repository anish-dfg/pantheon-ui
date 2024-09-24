// import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { VolunteerDetails } from "~/intf/entities";
import { generateColorPalette, hex } from "~/services/colors";

export const description = "A pie chart with a label list";

type EthnicitiesProps = {
  title: string;
  description?: string;
  volunteers: VolunteerDetails[];
  field: keyof VolunteerDetails;
};

// let key = keyof VolunteerDetails;

export const InsightAsPie = ({
  title,
  description,
  volunteers,
  field,
}: EthnicitiesProps) => {
  // const data = Array.isArray(volunteers[0][field]) ? ([] as any[]) : [];

  const categories = Array.isArray(volunteers[0][field])
    ? new Set(volunteers.flatMap((v) => v[field] as unknown))
    : new Set(volunteers.map((v) => v[field] as unknown));

  const palette = generateColorPalette(categories.size, 30);

  const data = Array.isArray(volunteers[0][field])
    ? Array.from(categories).map((category, i) => {
        const count = volunteers.filter((v) =>
          (v[field] as unknown[]).includes(category),
        ).length;
        return { [field]: category, count, fill: hex(palette[i]) };
      })
    : Array.from(categories).map((category, i) => {
        const count = volunteers.filter((v) => v[field] === category).length;
        return { [field]: category, count, fill: hex(palette[i]) };
      });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = {} satisfies ChartConfig;

  // data.forEach((d) => {
  //   config[d[field]] = {
  //     label: d[field],
  //     color: d.fill,
  //   };
  // });

  Array.from(categories).forEach((category, i) => {
    config[category as string] = {
      label: category,
      // (category as string).length > 10
      //   ? (category as string).slice(0, 10)
      //   : category,
      color: hex(palette[i]),
    };
  });

  // Example: Generate a palette of 18 colors (3 sets of 6 variations)
  // const palette = generateColorPalette(18, 30);
  //
  // palette.forEach((color, index) => {
  //   console.log(`Color ${index + 1}: rgb(${color.r}, ${color.g}, ${color.b})`);
  // });

  return (
    <Card className="flex flex-col border-0 dark:bg-space dark:text-offwhite">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="count"
                  // hideLabel
                  className="flex justify-between items-center [&>*]:flex [&>*]:justify-between"
                />
              }
            />
            <Pie data={data} dataKey="count" nameKey={field} labelLine></Pie>
            {categories.size < 8 && (
              <ChartLegend
                content={<ChartLegendContent nameKey={field} />}
                className="grid overflow-scroll grid-cols-4 gap-2 gap-x-6 w-full text-nowrap [&>*]:max-w-12 [&>*]:overflow-scroll"
              />
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm"> */}
      {/*   <div className="flex gap-2 items-center font-medium leading-none"> */}
      {/*     Trending up by 5.2% this month <TrendingUp className="w-4 h-4" /> */}
      {/*   </div> */}
      {/*   <div className="leading-none text-muted-foreground"> */}
      {/*     Showing total visitors for the last 6 months */}
      {/*   </div> */}
      {/* </CardFooter> */}
    </Card>
  );
};
