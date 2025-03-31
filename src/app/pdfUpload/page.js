
"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

export default function PdfUploader() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles) => {
    console.log("accepted file: ",acceptedFiles[0])
    if (acceptedFiles.length > 0) {        
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setShowModal(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  async function uploadFile() {

     if (!uploadedFile) {
        console.error("No file to upload");
        return;
    }
    const formData = new FormData();
    formData.append("file", uploadedFile);
    console.log("from file upload: ",formData);


    try {
        const response = await fetch("/api/uploads", {
            method: "POST",
            body: formData,
        });

        // console.log("Response Status:", response.status);
        const data = await response.json(); // Check raw response first
        // console.log("Response Text:", text);

        if (!response.ok) {
            throw new Error(`Upload failed: ${data}`);
        }
        console.log(data)
        setFileUrl(data.url);
        setUploading(false);
        return data;
    } catch (error) {
        console.error("Upload error:", error);
    }
}

  const handlePublish = () => {
    if (fileUrl) {
      router.push(`/viewer?file=${encodeURIComponent(fileUrl)}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300">
      <div
        {...getRootProps()}
        className="w-3/4 md:w-2/3 lg:w-1/2 h-64 p-10 bg-white rounded-lg shadow-md text-center cursor-pointer border-2 border-dashed border-gray-400 flex flex-col items-center justify-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500 font-semibold">Drop the file here...</p>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-3">Drag & drop a PDF here</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition">
              <FiUpload size={20} />
              <span>Click to Upload</span>
            </button>
          </div>
        )}
      </div>

      {showModal && uploadedFile && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] md:w-[600px] lg:w-[700px] h-[300px] md:h-[350px] flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-green-600 text-center">
              {uploading ? "Uploading..." : "Upload Successful!"}
            </h2>
            <p className="mt-4 text-gray-600 text-center">{uploadedFile.name}</p>

            <div className="flex justify-center gap-4 mt-6">
              {!fileUrl && (
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={uploadFile}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              )}

              {fileUrl && (
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handlePublish}
                >
                  Publish
                </button>
              )}

              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
