'use client';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const WebpageInput = ({ copyId, sendWelcomeEmail }: { copyId: string, sendWelcomeEmail: (webpageId: string, url: string, email: string, options: {status_code: boolean, page_title: boolean, page_content: boolean}) => void }) => {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [options, setOptions] = useState({'status_code': true, 'page_title': true, 'page_content': false});
  const router = useRouter();
 

  async function startTracking(){

    if(url != '' && email != ''){

      if(/\S+@\S+\.\S+/.test(email)){
        
        toast.loading("Submitting webpage.");
        
        const supabase = createClient(process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "", process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "");

        const { data, error } = await supabase
          .from('webpages')
          .insert({ 
            url: url,
            notification_email: email,
            track_status_code: options['status_code'],
            track_page_title: options['page_title'],
            track_page_content: options['page_content'],
            landing_copy_id: copyId
          })
          .select();

          
        if(!error){
          sendWelcomeEmail(data[0].id, url, email, options);
          router.push(`/alert/${data[0].id}`);
          setTimeout(() => {
            toast.dismiss();
          }, 1000);
          
        }else{

          toast.error("Error. Please try again later.");
        }

      }else{

        toast.error("Please provide a valid email address.");
      }

    }else{

      toast.error("Please specify URL and email address.");
    }
  }

  async function startTrackingClick(event: React.MouseEvent<HTMLButtonElement>){

    event.preventDefault();
    startTracking();
  }

  return (
    <div className="form-control">
      
      <div className="input-group text-center md:flex mt-6">

      
      <label className="flex input input-bordered flex-grow w-72 mx-auto items-center gap-2">
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          <input type="text" className="grow" placeholder="Website URL" 
            onInput={ (e) =>{ setUrl((e.target as HTMLInputElement).value); } }
            onBlur={ (e) => { if(!url.includes("http://") && !url.includes("https://") && url != ""){ setUrl(`http://${url}`); (e.target as HTMLInputElement).value = `http://${url}`; } } }
            onFocus={ (e) => { (e.target as HTMLInputElement).select(); } }
            onKeyDown={ (e) => { if(e.key == "Enter"){ startTracking(); } } }
           />
      </label>

      </div>
      <div className="input-group text-center md:flex mt-3">

        <label className="flex input input-bordered flex-grow w-72 mx-auto items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>

          <input type="email" className="grow" placeholder="Email" 
            onInput={(e) =>{ setEmail((e.target as HTMLInputElement).value); }}
            onKeyDown={ (e) => { if(e.key == "Enter"){ startTracking(); } } }
          />
        </label>
      
          <button className="btn btn-primary align-middle md:ml-3 w-72 md:w-52 mt-4 md:mt-0" onClick={startTrackingClick} >

            Start Tracking

          </button>

      </div>
      <div className='input-group'>
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-sm text-right">Advanced Options</div>
          <div className="collapse-content mb-6">
            <p>Select which details to keep track of.</p>
            <label className="flex align-middle m-3">
              <input type="checkbox" defaultChecked className="checkbox mr-2" onChange={(e) => { 
                setOptions({'status_code': e.target.checked, 
                'page_title': options['page_title'], 
                'page_content': options['page_content']});
                }} /> <p>Status Code</p>
            </label>
            <p className="ml-8 italic text-sm">404, 200, 500, etc.</p>
            <label className="flex align-middle m-3 mt-5">
              <input type="checkbox" defaultChecked className="checkbox mr-2" onChange={(e) => {
                setOptions({'status_code': options['status_code'], 
                'page_title': e.target.checked, 
                'page_content': options['page_content']});
              }} /> <p>Page Title</p>
            </label>
            <label className="flex align-middle m-3 mt-5">
              <input type="checkbox" className="checkbox mr-2" onChange={(e) => {
                setOptions({'status_code': options['status_code'], 
                'page_title': options['page_title'], 
                'page_content': e.target.checked});
              }} /> <p>Page Content</p>
            </label>
            <p className="ml-8 italic text-sm">Warning: Dynamic webpage content may cause unexpected behaviour.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebpageInput
