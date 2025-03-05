import WebpageInput from "@/components/WebpageInput";
import { createClient } from '@supabase/supabase-js';
import Head from "next/head";
import type { Metadata } from 'next'
import fs from 'node:fs';
const nodemailer = require('nodemailer');

export let metadata: Metadata = {
  title: "Website Status Tracker",
  description: "Keep you and your team informed of any unexpected changes to your site."
};
metadata = {
  title: "Website Status Tracker",
  description: "Keep you and your team informed of any unexpected changes to your site."
};


async function sendWelcomeEmail(webpageId: string, url: string, email: string, options: {status_code: boolean, page_title: boolean, page_content: boolean}){
  "use server";
  console.log([url, email, options]);
  const greenCheck = '<span style="color: green; fontSize: larger;">&#10004;</span>';
  const redX = '<span style="color: red">&#10060;</span>';

  fs.readFile("private/welcome_email.html", 'utf8', async (error, fileBuffer) => {
    if (error) {
        console.error("File read error:", error);
    } else {

      if (error) {
          console.error("File read error:", error);
      } else {
  
        var transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
          });

        // Update variable placeholders in email template
        let bodyContent = fileBuffer;
        bodyContent = bodyContent.replaceAll("{{url}}", url);
        bodyContent = bodyContent.replaceAll("{{status_code_icon}}", options['status_code'] ? greenCheck : redX );
        bodyContent = bodyContent.replaceAll("{{page_title_icon}}", options['page_title'] ? greenCheck : redX );
        bodyContent = bodyContent.replaceAll("{{page_contents_icon}}", options['page_content'] ? greenCheck : redX );
        bodyContent = bodyContent.replaceAll("{{webpage_id}}", webpageId);
        bodyContent = bodyContent.replaceAll("{{upgrade_url}}", `${process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_1}?prefilled_email=${email}`);
        
        var mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Website Update Alerts Confirmation",
            html: bodyContent
        };
        
        transporter.sendMail(mailOptions, function(error: any, info: any){
            if (error) {
                console.log(error);
            }
        }); 
      }
    }
  });
}

export default async function Home({
  searchParams
}: { searchParams: Promise<{ id: string, random: boolean }>}) {
  
  const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");
  const { id, random } = await searchParams;
  if(random){
    const { data, error } = await supabase
        .from('landing_copy')
        .select()
        .gte('id', crypto.randomUUID());
    if(!error && data.length > 0){ 
      metadata['title'] = data[0].title;
      metadata['description'] = data[0].subtitle;
    }
  }else{
    const { data, error } = await supabase
        .from('landing_copy')
        .select()
        .eq('id', id);
    if(!error && data.length > 0){ 
      metadata['title'] = data[0].title;
      metadata['description'] = data[0].subtitle;
    }
  }
      
  return (
    <>
      <Head>
        <title>{String(metadata['title'])}</title>
        <meta name="description">{metadata['description']}</meta>
      </Head>
      <div className="h-screen flex items-center justify-center">
        <div>
          <div className="text-center pl-1 pr-1 md:p-0">
            {/* <img src="/logo.png" className="align-top mx-auto mb-5 hidden md:block" width={175} /> */}
            <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">{String(metadata['title'])}</h1>
            <p className="mt-2">{metadata['description']}</p>
          </div>
          
          <WebpageInput copyId={id ? id : "753ac0ec-9719-405a-9cf6-70da99ddfe4b"} sendWelcomeEmail={sendWelcomeEmail} />
        </div>
      </div>
    </>
  );
}
