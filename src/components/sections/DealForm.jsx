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
import toast, { Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import { fetchMetaData } from "./fetchData";
import { v4 as uuidv4 } from "uuid";

import Cookies from "@/components/sections/cookies";
const formSchema = z.object({
  name: z.string().min(1).max(256),
  origin: z.string().min(1).max(256),
  rounddetails: z.string().min(1),
  tldr: z.string().min(1),
  links: z.string().min(1),
  date: z.date(),
  status: z.enum(["Invested", "Passed", "IC", "Inbound"]),
  website: z.string(),
  files: z.any().optional(),
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
);
function generateUniqueId() {
  return uuidv4();
}

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
      files: [""],
    },
  });
  const inputRef = useRef(null);
  const handleSubmit = async (values) => {
    const loadingToast = toast.loading("Submitting...");
    console.log(values.name);
    try {
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
            email: email,
            id: id,
            file_links: fileLinks,
          },
        ],
        { onConflict: ["id"] }
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

  const id = generateUniqueId();

  const [webUrl, setWebUrl] = useState("");
  const [email, setEmail] = useState("");
  const [fileLinks, setFileLinks] = useState([]);
  const [filesData, setFilesData] = useState(null);
  const fetchData = async (e) => {
    e.preventDefault();
    const cookiesEmail = await Cookies();
    setEmail(cookiesEmail.value);
    console.log(email);
    console.log(cookiesEmail);
    console.log(typeof email);
    const result = await fetchMetaData(webUrl);
    console.log(result);
    console.log(webUrl);
    console.log(result.metadata.title);
    form.setValue("name", result.metadata.title);
    onBrandChange(result.metadata);
    form.setValue("tldr", result.metadata.description);
    form.setValue("links", result.metadata.website);
    form.setValue("website", result.metadata.website);
    const date = new Date(Date.now());
    console.log(date);
    form.setValue("date", date);
  };
  async function handleFileUpload(event) {
    if (!event.target.files || event.target.files.length === 0) {
      return; // User canceled file selection
    }

    const files = event.target.files;

    const uploadPromises = [];
    form.setValue("files", filesData);

    for (const file of Array.from(files)) {
      const promise = (async () => {
        try {
          const uniqueFileName = `${uuidv4()}_${file.name.replace(/\s/g, "")}`;

          const { data, error } = await supabase.storage
            .from("files")
            .upload(`public/${uniqueFileName}`, file, {
              contentType: file.type,
            });
          if (error) {
            console.error("Error uploading file to Supabase:", error);
            throw new Error("File upload error");
          }

          // Get the public URL of the uploaded file
          const fileUrl = supabase.storage
            .from("files")
            .getPublicUrl(uniqueFileName);

          console.log("File uploaded to Supabase:", data);

          return { name: uniqueFileName, url: fileUrl };
        } catch (error) {
          console.error("Error handling file upload:", error);
          throw error;
        }
      })();

      uploadPromises.push(promise);
    }

    try {
      const uploadedFiles = await Promise.all(uploadPromises);

      const fileLinks = uploadedFiles.map((file) => file.url);
      const linksArray = fileLinks.map((file) => file.data.publicUrl);

      const modifiedLinksArray = linksArray.map((link) =>
        link.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/`,
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/public/`
        )
      );

      setFileLinks(modifiedLinksArray);
    } catch (error) {
      console.error("Error handling file uploads:", error);
    }
  }

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

            <FormField
              control={form.control}
              name="files"
              id="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Files</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Upload files"
                      {...field}
                      type="file"
                      ref={inputRef}
                      onChange={handleFileUpload}
                      multiple
                    />
                  </FormControl>
                  <FormDescription>
                    Upload files related to the deal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    </>
  );
}
