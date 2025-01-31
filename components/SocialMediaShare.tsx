'use client';
import Link from 'next/link'
import React from 'react'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

const SocialMediaShare = () => {
    const url = "https://www.website-tracker.com/"
  return (
    <>

    <div className='fixed bottom-12 mb-5 md:bottom-0 right-5 md:left-4 md:w-6/12'>
        <Link href="mailto:contact@website-tracker.com?subject=Webpage Update Tracker Support" className="link link-hover flex-grow">
            <p className='flex gap-1'>Contact Support
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>

            </p>
        </Link>
    </div>

    <div className="flex fixed bottom-0 right-2">

        
        <div className="">
            <p className='text-center mb-1'>

                <FacebookShareButton url={url} className='m-1'>
                    <FacebookIcon round={true} size={45} />
                </FacebookShareButton>

                <LinkedinShareButton url={url} className='m-1'>
                    <LinkedinIcon round={true} size={45} />
                </LinkedinShareButton>

                <TwitterShareButton url={url} className='m-1'>
                    <TwitterIcon round={true} size={45} />
                </TwitterShareButton>

                <RedditShareButton url={url} className='m-1'>
                    <RedditIcon round={true} size={45} />
                </RedditShareButton>

                <WhatsappShareButton url={url} className='m-1'>
                    <WhatsappIcon round={true} size={45} />
                </WhatsappShareButton>

                </p>
        </div>

         
          
        </div>
    </>
  )
}

export default SocialMediaShare
