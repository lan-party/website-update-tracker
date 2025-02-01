'use client';
import React from 'react'
import { createClient } from "@supabase/supabase-js";
import Stripe from 'stripe';
import toast from 'react-hot-toast';

const UnsubscribeButton = ({ webpageId }: {
    webpageId: string
}) => {

    async function unsubscribe(){
        
        toast.loading("Disabling alerts.");

        const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "");

        // Remove entry from webpages table
        await supabase.from('webpages').delete().eq('id', webpageId);

        // Remove/disable subscription in stripe
        const { data, error } = await supabase.from('webpages').select().eq('id', webpageId);
        if(!error && !["", null].includes(data[0].stripe_subscription_id)){
            await stripe.subscriptions.cancel(data[0].stripe_subscription_id);
        }

        toast.dismiss();
        toast.success("Unsubscribed successfully.");
    }

    return (
    <>
        <button type="button" className="btn btn-primary mt-6" onClick={unsubscribe}>
            Unsubscribe
        </button>
    </>
    )
}

export default UnsubscribeButton
