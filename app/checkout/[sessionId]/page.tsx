import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Stripe from "stripe";

export default async function Page({ params, }: {
    params: Promise<{ sessionId: string }>
}) {
    const sessionId = (await params).sessionId;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "");

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (checkoutSession.payment_status !== 'unpaid') {
      const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");

      // Select latest webpage entry for the given email address
      const { data, error } = await supabase.from('webpages')
        .select()
        .eq('notification_email', checkoutSession.customer_details?.email)
        .is('stripe_subscription_id', null)
        .order('created_at', { ascending: false })
        .limit(1);

      if(!error && data.length > 0){

        // Update webpages table entry to include subscription id
        await supabase.from('webpages')
          .update({ 'stripe_subscription_id': checkoutSession.subscription })
          .eq('id', data[0].id);
      }
    }

    return (
      <div className="h-screen flex items-center justify-center">
        <div>
          <div className="text-center pl-1 pr-1 md:p-0">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">Notification Priority Upgraded!</h1>
            <p className="mt-3">You&apos;ll receive alert notifications about changes to your webpage as soon as possible.</p>
            
            <Link href="/"><button className="btn btn-primary w-52 mt-5">New Notification</button></Link>
          </div>
        </div>
      </div>
    )
  }
  