"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useState } from "react";
import { fetchMetaData } from "./fetchData";
import { useStore, setName } from "@/store";
import appStore from "@/mobxStore";
const formSchema = z.object({
  name: z.string().min(1).max(256),
  origin: z.string().min(1).max(256),
  rounddetails: z.string().min(1),
  tldr: z.string().min(1),
  links: z.string().min(1),
  date: z.date(),
  status: z.enum(["Invested", "Passed", "IC", "Inbound"]),
  website: z.string().url(),
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home({ onBrandChange }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      origin: "",
      rounddetails: "",
      tldr: "",
      links: "",
      date: null,
      status: "",
      website: "",
    },
  });

  const handleSubmit = async (values) => {
    console.log(values.name);
    try {
      // Insert data into the Supabase table
      const loadingToast = toast.loading("Submitting...");

      const { data, error } = await supabase.from("details").upsert(
        [
          {
            name: values.name,
            origin: values.origin,
            round_details: values.rounddetails,
            tldr: values.tldr,
            links: values.links,
            deal_date: values.date,
            status: values.status,
            website: values.website,
          },
        ],
        { onConflict: ["name"] }
      );
      toast.dismiss(loadingToast);

      if (error) {
        toast.error(`Error: ${error.message}`);

        console.error("Error inserting data into Supabase:", error.message);
      } else {
        toast.success("Data submitted successfully");

        console.log("Data inserted successfully:", data);
        form.reset();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);

      console.error("Error:", error.message);
    }
  };
  const [webUrl, setWebUrl] = useState("");
  const [name, setName] = useState("");
  const fetchData = async (e) => {
    e.preventDefault();
    const result = await fetchMetaData(webUrl);
    console.log(result);
    console.log(webUrl);
    console.log(result.metadata.title);
    form.setValue("name", result.metadata.title);
    setName(result.metadata.title);
    onBrandChange(result.metadata);
    form.setValue("tldr", result.metadata.description);
    form.setValue("links", result.metadata.website);
    form.setValue("date", Date.now());
    appStore.updateName(result.metadata.title);
    appStore.updateTldr(result.metadata.description);
    appStore.updateLinks(result.metadata.website);
  };
  // setName(name);
  console.log("use store");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const links = useStore((state) => state.name);
  console.log(links);
  return (
    <>
      <Toaster />

      <main className=" rounded-[50px] bg-white p-14">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="flex w-full flex-wrap items-center gap-5">
              <FormField
                control={form.control}
                name="website"
                className="flex-1"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Complete Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://example.com/"
                          {...field}
                          onChange={(e) => setWebUrl(e.target.value)}
                          value={webUrl}
                          className="flex-1"
                        />
                      </FormControl>
                      <FormDescription>Your website URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button onClick={fetchData}>Fetch Details</Button>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your brand name" {...field} />
                    </FormControl>
                    <FormDescription>This is your brand name</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your brand origin" {...field} />
                    </FormControl>
                    <FormDescription>This is your brand origin</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="rounddetails"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Round Details</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your round details"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is round details</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="tldr"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>TLDR</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your TLDR" {...field} />
                    </FormControl>
                    <FormDescription>This is TLDR</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="links"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Important Links</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter important links separated by ,"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Separated by commas</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Date of deal closed</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                return (
                  <FormItem className="cursor-pointer">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the status of the deal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Invested">Invested</SelectItem>
                        <SelectItem value="Passed">Passed</SelectItem>
                        <SelectItem value="IC">IC</SelectItem>
                        <SelectItem value="Inbound">Inbound</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Your deal status</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Uncomment the below code if you want to include the "Files" field */}
            {/* <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Files</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Upload files"
                    {...field}
                    type="file"
                    multiple
                  />
                </FormControl>
                <FormDescription>
                  Upload files related to the deal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    </>
  );
}
