import Link from "next/link";


export default function Page({ params, }: {
  params: Promise<{ sessionId: string }>
}) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>
          <div className="text-center pl-1 pr-1 md:p-0">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">Notification Priority Upgraded!</h1>
            <p className="mt-3">You'll receive alert notifications about changes to your webpage as soon as possible.</p>
            
            <Link href="/"><button className="btn btn-primary w-52 mt-5">New Notification</button></Link>
          </div>
        </div>
      </div>
    )
  }
  