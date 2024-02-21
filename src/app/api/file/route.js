import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const fileNames = formData.getAll("files");

    // Check if the file field is present in the form data
    if (!fileNames || fileNames.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 } // Bad Request status
      );
    }

    // Log the original file names
    console.log("Original File Names:", fileNames);

    // Generate unique identifiers for each file and remove spaces in the original name
    const fileObjects = fileNames
      .map((fileName, i) => {
        const file = formData.get(fileName);
        console.log("file");
        console.log(file);

        // Check if the file is null or undefined
        if (!file) {
          console.error("File is null or undefined");
          return null;
        }

        const originalName = fileName.name.replace(/\s/g, ""); // Remove spaces in the original name
        const uniqueFileName = uuidv4() + "_" + originalName;
        const contentType = formData.get(fileName.type);
        return { file, uniqueFileName, contentType };
      })
      .filter(Boolean); // Remove any null values

    const uploadedFiles = await Promise.all(
      fileObjects.map(async ({ file, uniqueFileName, contentType }) => {
        console.log("file supa");
        console.log(file);

        // Convert Blob to Buffer before uploading to Supabase
        const buffer = Buffer.from(await file.arrayBuffer());

        const { data, error } = await supabase.storage
          .from("files")
          .upload(`/${uniqueFileName}`, buffer, { contentType });

        if (error) {
          console.error("Error uploading file to Supabase:", error);
          throw new Error("File upload error");
        }

        console.log("File uploaded to Supabase:", data);
        return { name: uniqueFileName, data };
      })
    );

    // Fetch URLs for the uploaded files
    const fileUrls = uploadedFiles.map(({ name }) => {
      return supabase.storage.from("files").getPublicUrl(name);
    });

    // Additional processing or response logic here

    // Send a success response back to the client with file URLs
    console.log("Files uploaded successfully to Supabase:", fileUrls);
    return NextResponse.json(
      { success: true, message: "Files uploaded successfully", fileUrls },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling file upload:", error);
    console.log("Sending internal server error response");
    return NextResponse.json(
      { error: "Internal server error by us" },
      { status: 500 }
    );
  }
}
