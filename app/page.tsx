import WebpageInput from "@/components/WebpageInput";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="text-center pl-1 pr-1 md:p-0">
          {/* <img src="/logo.png" className="align-top mx-auto mb-5 hidden md:block" width={175} /> */}
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">Website Update Tracker</h1>
          <p className="mt-2">Input a link to a webpage and we&apos;ll notify you whenever it changes.</p>
        </div>
        
        <WebpageInput />
      </div>
    </div>
  );
}
