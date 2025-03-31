import Link from "next/link";


export default function Home() {
  return (
    <div className="text-dark text-center bg-white">
      <button className="border-2 bg-green-600"><Link href="/pdfUpload">Upload PDF</Link> </button>
    </div>
   
  );
}
