import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Stripe from "stripe";


export default async function Page({ params, }: {
  params: Promise<{ webpageId: string }>
}) {

    const webpageId = (await params).webpageId;
    const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "");

    // Remove entry from webpages table
    await supabase.from('webpages').delete().eq('id', webpageId);

    // Remove/disable subscription in stripe
    const { data, error } = await supabase.from('webpages').select().eq('id', webpageId);
    if(!error && !["", null].includes(data[0].stripe_subscription_id)){
        await stripe.subscriptions.cancel(data[0].stripe_subscription_id);
    }

    redirect('/');
  
}
  