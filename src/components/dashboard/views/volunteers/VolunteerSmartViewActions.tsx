import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { InfoTooltip } from "~/components/ui/info-tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { VolunteerDetails } from "~/intf/entities";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import {
  ExportUsersToWorkspaceOptions,
  exportUsersToWorkspaceOptionsSchema,
} from "~/intf/requests";
import { useDataExportsAPI } from "~/hooks/useDataExportsAPI";
import { useEffect, useState } from "react";
import { useJobsAPI } from "~/hooks/useJobsAPI";
import { Checkbox } from "~/components/ui/checkbox";
import { convertObjArrayToTsv } from "~/services/csv";

type VolunteerSmartViewActionsProps = {
  projectCycleId: string;
  volunteers: VolunteerDetails[];
  fieldNames: string[];
};

export const VolunteerSmartViewActions = ({
  projectCycleId,
  volunteers,
  fieldNames,
}: VolunteerSmartViewActionsProps) => {
  const form = useForm<ExportUsersToWorkspaceOptions>({
    resolver: zodResolver(exportUsersToWorkspaceOptionsSchema),
    defaultValues: {
      useFirstAndLastName: true,
      addUniqueNumericSuffix: true,
      separator: undefined,
      generatedPasswordLength: 8,
      changePasswordAtNextLogin: true,
      skipUsersOnConflict: false,
      volunteers: volunteers,
    },
  });

  const [selectedFields, setSelectedFields] = useState([] as string[]);

  useEffect(() => {
    form.setValue("volunteers", volunteers);
  }, [volunteers, form]);

  const dataExportsAPI = useDataExportsAPI();
  const jobsAPI = useJobsAPI();

  const handleUndo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newJobId: string,
  ) => {
    e.preventDefault();
    try {
      jobsAPI.sendCancellationSignal(newJobId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadJson = () => {
    const jsonData = new Blob([JSON.stringify(volunteers, null, 2)], {
      type: "text/json",
    });
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = `volunteers.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTsv = () => {
    const tsvString = convertObjArrayToTsv(volunteers, selectedFields);
    const tsvData = new Blob([tsvString], { type: "text/tsv" });
    const tsvURL = URL.createObjectURL(tsvData);
    const link = document.createElement("a");
    link.href = tsvURL;
    link.download = `volunteers.tsv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportToWorkspace = async (
    data: ExportUsersToWorkspaceOptions,
  ) => {
    console.log(data.volunteers);
    try {
      const newJobId = await dataExportsAPI.exportUsersToWorkspace(
        projectCycleId,
        data,
      );
      toast.info("Started export job", {
        cancel: {
          label: "Undo",
          onClick: async (e) => handleUndo(e, newJobId),
        },
        duration: 5000,
      });
    } catch (e) {
      toast("Failure", {
        description: `There was an error starting the export job ${e}`,
        className: "bg-error text-offwhite",
        duration: 5000,
      });
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2 items-center">
        <h3 className="text-xl font-bold">Actions</h3>
        <InfoTooltip tooltipMessage="Export or import actions for this SmartView" />
      </div>

      <Tabs defaultValue="exportActions" className="w-full">
        <TabsList className="grid grid-cols-2 gap-2 p-1 w-full rounded-md bg-mediumgray dark:text-offwhite">
          <TabsTrigger
            value="exportActions"
            // className="data-[state=active]:text-space"

            className="data-[state=active]:text-space text-offwhite"
          >
            Export
          </TabsTrigger>
          <TabsTrigger
            value="importActions"
            className="data-[state=active]:text-space text-offwhite"
            // className="data-[state=active]:text-space"
          >
            Import
          </TabsTrigger>
        </TabsList>
        <TabsContent value="exportActions">
          <div className="flex flex-col p-2">
            <ul className="flex flex-col gap-2 justify-between w-full">
              <li className="w-1/2 cursor-pointer">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      // onClick={() => handleDownloadJson()}
                      className="w-full hover:duration-300 dark:bg-space dark:hover:bg-offwhite dark:hover:text-space hover:bg-space hover:text-offwhite"
                    >
                      Download
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="dark:bg-space dark:text-offwhite">
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        Download Data
                      </DialogTitle>
                      <DialogDescription>
                        Here's where you can download the data for this
                        SmartView in a few friendly formats.
                      </DialogDescription>

                      <Separator
                        orientation="horizontal"
                        className="dark:bg-offwhite"
                      />
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                      <h3>Select Fields</h3>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {fieldNames.map((fieldName) => (
                          <div
                            className="flex gap-2 items-center"
                            key={fieldName}
                          >
                            <Checkbox
                              id={fieldName}
                              onClick={() => {
                                setSelectedFields((prev) => {
                                  if (!prev.includes(fieldName)) {
                                    return [...prev, fieldName];
                                  } else {
                                    return prev.filter(
                                      (item) => item !== fieldName,
                                    );
                                  }
                                });
                              }}
                            />
                            <label
                              htmlFor={fieldName}
                              className="overflow-x-scroll text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {fieldName}
                            </label>
                          </div>
                        ))}
                      </div>

                      <Separator
                        orientation="horizontal"
                        className="dark:bg-offwhite"
                      />

                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => handleDownloadJson()}
                          className="w-full dark:bg-space"
                        >
                          Download JSON
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => handleDownloadTsv()}
                          className="w-full dark:bg-space"
                        >
                          Download TSV
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li className="w-1/2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full hover:duration-300 dark:bg-space dark:hover:bg-offwhite dark:hover:text-space hover:bg-space hover:text-offwhite"
                    >
                      Export to Workspace
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="dark:bg-space dark:text-offwhite">
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        Configure your Export.
                      </DialogTitle>
                      <DialogDescription>
                        Here's where you can set policies for your export.
                      </DialogDescription>

                      <Separator
                        orientation="horizontal"
                        className="dark:bg-offwhite"
                      />
                    </DialogHeader>

                    <Form {...form}>
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(
                          async () =>
                            await handleExportToWorkspace(form.getValues()),
                        )}
                      >
                        <div className="flex flex-col gap-4">
                          <h3 className="text-lg font-bold">Email Policy</h3>
                          <Separator
                            orientation="horizontal"
                            className="dark:bg-offwhite"
                          />
                          <FormField
                            control={form.control}
                            name="useFirstAndLastName"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center">
                                  <FormLabel className="flex gap-2">
                                    <p>Use first and last names</p>
                                    <InfoTooltip tooltipMessage="Use the user's first and last name in their generated email, e.g. maryzhu@developforgood.org." />
                                  </FormLabel>

                                  <FormControl>
                                    <Switch
                                      className="dark:bg-offwhite"
                                      thumbClassName="dark:bg-space"
                                      onCheckedChange={field.onChange}
                                      checked={field.value}
                                    />
                                    {/* <Input placeholder="shadcn" {...field} /> */}
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="addUniqueNumericSuffix"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center">
                                  <FormLabel className="flex gap-2">
                                    <p>Add unique numeric suffix</p>
                                    <InfoTooltip tooltipMessage="Add a unique numeric suffix to the user's email, e.g. maryzhu12@developforgood.org" />
                                  </FormLabel>

                                  <FormControl>
                                    <Switch
                                      className="dark:bg-offwhite"
                                      thumbClassName="dark:bg-space"
                                      onCheckedChange={field.onChange}
                                      checked={field.value}
                                    />
                                    {/* <Input placeholder="shadcn" {...field} /> */}
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {form.watch("useFirstAndLastName") && (
                            <FormField
                              control={form.control}
                              name="separator"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-center">
                                    <FormLabel className="flex gap-2">
                                      <p>Separator</p>
                                      <InfoTooltip tooltipMessage="Separator between first and last names (options: .|-|_), e.g. mary.zhu@developforgood.org" />
                                    </FormLabel>

                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="_"
                                        className="max-w-12"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        <div className="flex flex-col gap-4">
                          <h3 className="text-lg font-bold">Password Policy</h3>

                          <Separator
                            orientation="horizontal"
                            className="dark:bg-offwhite"
                          />
                          <FormField
                            control={form.control}
                            name="generatedPasswordLength"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center">
                                  <FormLabel className="flex gap-2">
                                    <p>Generated password length</p>
                                    <InfoTooltip tooltipMessage="This sets the length of the password that will be generated for the user" />
                                  </FormLabel>

                                  <FormControl>
                                    <Input
                                      placeholder="8"
                                      className="max-w-16"
                                      type="number"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(
                                          parseInt(e.target.value),
                                        );
                                      }}
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="changePasswordAtNextLogin"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center">
                                  <FormLabel className="flex gap-2">
                                    <p>Change password at next login</p>
                                    <InfoTooltip tooltipMessage="Should the user change their password the next time they login?" />
                                  </FormLabel>

                                  <FormControl>
                                    <Switch
                                      className="dark:bg-offwhite"
                                      thumbClassName="dark:bg-space"
                                      onCheckedChange={field.onChange}
                                      checked={field.value}
                                    />
                                    {/* <Input placeholder="shadcn" {...field} /> */}
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="skipUsersOnConflict"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between items-center">
                                  <FormLabel className="flex gap-2">
                                    <p>Skip users on conflict </p>
                                    <InfoTooltip tooltipMessage="If there already exists a user with this user's primary email, should we abort the export, or skip them?" />
                                  </FormLabel>

                                  <FormControl>
                                    <Switch
                                      className="dark:bg-offwhite"
                                      thumbClassName="dark:bg-space"
                                      onCheckedChange={field.onChange}
                                      checked={field.value}
                                    />
                                    {/* <Input placeholder="shadcn" {...field} /> */}
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="dark:bg-space dark:border-offwhite"
                          variant="outline"
                        >
                          Export
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="importActions">Nothing here yet.</TabsContent>
      </Tabs>
    </div>
  );
};
