import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Button } from "~/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Input } from "~/components/ui/input";

import { Textarea } from "~/components/ui/textarea";

import { useQuery } from "@tanstack/react-query";
import useAPI from "~/hooks/useAPI";
import { CreateAirtableViewSkeleton } from "~/components/dashboard/CreateAirtableViewSkeleton";
import { useNavigate } from "react-router-dom";

const importAirtableBaseSchema = z.object({
  baseId: z.string(),
  name: z.string(),
  description: z.string(),
});

type ImportAirtableBase = z.infer<typeof importAirtableBaseSchema>;

export const CreateAirtableView = () => {
  const api = useAPI();
  const navigate = useNavigate();
  const form = useForm<ImportAirtableBase>({
    resolver: zodResolver(importAirtableBaseSchema),
    defaultValues: {
      baseId: "",
      name: "",
      description: "",
    },
  });

  const { data, isPending } = useQuery({
    queryKey: ["airtable-bases"],
    queryFn: async () => {
      return await api.fetchAvailableBases();
    },
  });

  const createAirtableBase = async (data: ImportAirtableBase) => {
    try {
      await api.importAirtableBase(data.baseId, data.name, data.description);
      toast("Success", {
        description:
          "A job to import the base has been started. You can check the status on the dashboard.",
        className: "bg-success text-offwhite",
      });
      navigate("/dashboard");
    } catch (e) {
      toast("Failure", {
        description: `There was an error starting the import job ${e}`,
        className: "bg-error text-offwhite",
      });
    }
  };

  if (isPending) {
    return <CreateAirtableViewSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 p-6 rounded-md border border-mediumgray dark:border-offwhite">
      <div>
        <h2 className="text-xl font-bold">
          To get started with Pantheon, please import a base.
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createAirtableBase)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="baseId"
            render={({ field }) => (
              <FormItem aria-required={true}>
                <FormLabel className="flex gap-2 items-center w-fit">
                  <p>Base ID</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircledIcon className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="rounded-md text-space max-w-[15rem] dark:bg-offwhite">
                        <p>
                          If the base you're looking for isn't here, please
                          update the access settings of the API token in the
                          Pantheon App.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a base" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data?.map((base) => (
                          <SelectItem
                            key={base.id}
                            value={base.id}
                            className="cursor-pointer"
                          >
                            {base.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  This is the ID of the Airtable base you want to import.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem aria-required={true}>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    {...field}
                    className="dark:placeholder-lightgray"
                  />
                </FormControl>
                <FormDescription>
                  Give this base a memorable name. It doesn't have to be the
                  same as the Airtable base name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe this base"
                    {...field}
                    className="dark:placeholder-lightgray"
                  />
                </FormControl>
                <FormDescription>
                  This is the ID of the Airtable base you want to import.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="self-end max-w-32 dark:bg-offwhite dark:text-space"
          >
            Import
          </Button>
        </form>
      </Form>
    </div>
  );
};
