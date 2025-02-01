import UnsubscribeButton from "@/components/UnsubscribeButton";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";


export default async function Page({ params, }: {
  params: Promise<{ webpageId: string }>
}) {

  const webpageId = (await params).webpageId;
  const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");

  let email = "";
  let url = "";
  let stripe_subscription_id = "";
  const { data, error } = await supabase.from('webpages').select().eq('id', webpageId);
  if(!error){
    email = data[0].notification_email;
    url = data[0].url;
    stripe_subscription_id = data[0].stripe_subscription_id;
  }else{
    redirect('/');
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
      <div className="text-center pl-1 pr-1 md:p-0">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">Unsubscribe from alerts</h1>
        <p className="mt-3 mb-1">Click the button below to disable alert notifications for <b>{email}</b> about the webpage <b>&quot;{url}&quot;</b>.</p>
        {!["", null].includes(stripe_subscription_id) && <p className="text-sm"><i>This will disable automatic monthlly charges.</i></p>}
        <UnsubscribeButton webpageId={webpageId} />
      </div>
      </div>
    </div>
  )
}
  