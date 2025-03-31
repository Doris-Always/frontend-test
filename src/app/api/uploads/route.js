import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  console.log("this is formdata: ",formData);
  try {
    // const formData = await req.formData();
    // console.log("this is formdata: ",formData);
    const file = formData.get("file");
        console.log(file)
    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the file path inside public/uploads
    const filePath = path.join(process.cwd(), "public/uploads", file.name);

    // Save the file
    await writeFile(filePath, buffer);

    // Return public URL
    const fileUrl = `/uploads/${file.name}`;

    return Response.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}

