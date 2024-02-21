import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Busboy from "busboy";

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req, res) {
  try {
    // Parse the incoming request manually with Busboy
    const busboy = new Busboy({ headers: req.headers });

    // Handle file events
    busboy.on("file", async (fieldname, file, filename) => {
      const fileBuffer = [];
      file.on("data", (data) => {
        fileBuffer.push(data);
      });

      file.on("end", async () => {
        const buffer = Buffer.concat(fileBuffer);
        const { data, error } = await supabase.storage
          .from("filesname") // Replace with your actual storage bucket name
          .upload(`/${filename}`, buffer);

        if (error) {
          console.error("Error uploading file to Supabase:", error);
          throw new Error("File upload error");
        }

        console.log("File uploaded to Supabase:", data);
      });
    });

    // Handle finish event
    busboy.on("finish", () => {
      console.log("File parsing finished");
      return NextResponse.json(
        { success: true, message: "Files uploaded successfully" },
        { status: 200 }
      );
    });

    // Pipe the request to Busboy
    req.pipe(busboy);
  } catch (error) {
    console.error("Error handling file upload:", error);
    console.log("Sending internal server error response");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
