import WebpageInput from "@/components/WebpageInput";
import { createClient } from '@supabase/supabase-js';
import Head from "next/head";
import type { Metadata } from 'next'

export let metadata: Metadata = {
  title: "Website Status Tracker",
};
metadata = {
  title: "Website Status Tracker",
};


export default async function Home({
  searchParams
}: { searchParams: Promise<{ id: string, random: boolean }>}) {
  
  const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");
  const { id, random } = await searchParams;
  let title = "Website Status Tracker";
  let subtitle = "Keep you and your team informed of any unexpected changes to your site.";
  if(random){
    const { data, error } = await supabase
        .from('landing_copy')
        .select()
        .gte('id', crypto.randomUUID());
    if(!error && data.length > 0){ 
        title = data[0].title;
        subtitle = data[0].subtitle;
    }
  }else{
    const { data, error } = await supabase
        .from('landing_copy')
        .select()
        .eq('id', id);
    if(!error && data.length > 0){ 
        title = data[0].title;
        subtitle = data[0].subtitle;
    }
  }

  metadata['title'] = title;
  metadata['description'] = subtitle;
      
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description">{subtitle}</meta>
      </Head>
      <div className="h-screen flex items-center justify-center">
        <div>
          <div className="text-center pl-1 pr-1 md:p-0">
            {/* <img src="/logo.png" className="align-top mx-auto mb-5 hidden md:block" width={175} /> */}
            <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">{title}</h1>
            <p className="mt-2">{subtitle}</p>
          </div>
          
          <WebpageInput copyId={id ? id : "753ac0ec-9719-405a-9cf6-70da99ddfe4b"} />
        </div>
      </div>
    </>
  );
}
