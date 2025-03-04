import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export default async function Page({ params, }: {
    params: Promise<{ webpageId: string }>
}) {
    const webpageId = (await params).webpageId;
    const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");

    let url = "";
    let email = "";
    const { data, error } = await supabase
        .from('webpages')
        .select()
        .eq('id', webpageId);
    if(!error && data.length > 0){ 
        url = data[0].url;
        email = data[0].notification_email;
    }else{
        notFound();
    }
    
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="text-center pl-1 pr-1 md:p-0">

          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">New Alert Created Successfully</h1>
          <p className="mt-3 text-lg">We&apos;ll check in on this webpage every <b>24 hours</b> to let you know if anything changes</p>
          <Link href={url} className='link link-hover'>
            <h2 className='text-xl font-bold leading-none tracking-tight md:text-2xl underline'>{url}</h2>
          </Link>

          <h2 className="mt-12 text-3xl font-bold">Need to know faster?</h2>
          <p>Upgrade to a paid plan and be notified within <b>minutes</b> for only <b>$1</b> per month!</p>
          <Link href={`${process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK : ""}?prefilled_email=${encodeURIComponent(email)}`}>
            <button className="btn btn-primary align-middle md:ml-3 w-72 md:w-52 mt-4 md:mt-3">Get Faster Updates</button>
          </Link>

          <p className='mt-16 text-sm'>Please check your spam folder for a welcome email from us.</p>
        </div>
      </div>
    </div>
  )
}
