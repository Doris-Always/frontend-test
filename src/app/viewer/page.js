// // "use client";
// // import { useState } from "react";
// // import { Document, Page } from "react-pdf";
// // import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // import "react-pdf/dist/esm/Page/TextLayer.css";

// // export default function Viewer({ pdfUrl }) {
// //   const [numPages, setNumPages] = useState(null);
// //   const [pageNumber, setPageNumber] = useState(1);

// //   function onDocumentLoadSuccess({ numPages }) {
// //     setNumPages(numPages);
// //   }

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
// //       <h2 className="text-xl font-semibold mb-4">PDF Viewer</h2>
// //       <div className="bg-white shadow-lg p-4 rounded-md w-full max-w-2xl">
// //         <Document
// //           file={pdfUrl || "/sample.pdf"} // Default PDF if no URL is provided
// //           onLoadSuccess={onDocumentLoadSuccess}
// //         >
// //           <Page pageNumber={pageNumber} renderTextLayer={false} />
// //         </Document>
// //       </div>
// //       <div className="flex gap-4 mt-4">
// //         <button
// //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
// //           onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
// //           disabled={pageNumber <= 1}
// //         >
// //           Prev
// //         </button>
// //         <span className="text-lg">{pageNumber} / {numPages}</span>
// //         <button
// //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
// //           onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
// //           disabled={pageNumber >= numPages}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { Document, Page, pdfjs } from "react-pdf";

// // ✅ Manually set worker path to avoid Next.js import issues
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function Viewer() {
//   const searchParams = useSearchParams();
//   const fileParam = searchParams.get("file");
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     if (fileParam) {
//       setFile(decodeURIComponent(fileParam)); // Decodes URL-encoded filenames
//     }
//   }, [fileParam]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h2 className="text-lg font-semibold mb-4">PDF Viewer</h2>
//       {file ? (
//         <Document file={file} onLoadError={(error) => console.error("PDF Load Error:", error)}>
//           <Page pageNumber={1} />
//         </Document>
//       ) : (
//         <p className="text-red-500">No PDF file selected</p>
//       )}
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { Document, Page} from "react-pdf";

// // ✅ Set worker path for PDF.js
// // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// import {pdfjs } from "react-pdf";

// // Set the worker source manually to a local path
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// export default function Viewer() {
//   const searchParams = useSearchParams();
//   const fileParam = searchParams.get("file");
//   const [fileUrl, setFileUrl] = useState(null);

//   useEffect(() => {
//     if (fileParam) {
//       setFileUrl(decodeURIComponent(fileParam));
//     }
//   }, [fileParam]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h2 className="text-lg font-semibold mb-4">PDF Viewer</h2>
//       {fileUrl ? (
//         <Document file={fileUrl} onLoadError={(error) => console.error("PDF Load Error:", error)}>
//           <Page pageNumber={1} />
//         </Document>
//       ) : (
//         <p className="text-red-500">No PDF file selected</p>
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Viewer() {
  const searchParams = useSearchParams();
  const fileParam = searchParams.get("file");
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

console.log("fileUrl",fileUrl);
  useEffect(() => {
    if (fileParam) {
      setFileUrl(decodeURIComponent(fileParam));
      console.log("url set")
    }
  }, [fileParam]);



    const onDocumentLoadSuccess = ({ numPages }) => {
      console.log("pdf loaded")
        setNumPages(numPages);
        console.log("number of pages",numPages)
    };
    console.log("Loading PDF from:", fileUrl);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">PDF Viewer</h2>
      {fileUrl ? (
        <Document file={fileUrl} onLoadError={(error) => console.error("PDF Load Error:", error)}
        onLoadSuccess={onDocumentLoadSuccess}
        
        >

          <Page pageNumber={pageNumber} />
        </Document>
      ) : (
        <p className="text-red-500">No PDF file selected</p>
      )}
    </div>
  );
}
