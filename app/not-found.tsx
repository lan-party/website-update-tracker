import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="text-center pl-1 pr-1 md:p-0">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">404</h1>
          <p className="mt-3">Could not find the requested resource.</p>
        </div>
      </div>
    </div>
  )
}