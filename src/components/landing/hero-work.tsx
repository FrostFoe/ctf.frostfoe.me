'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const ArrowIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="-3 -3 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#0b121f"
        d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
      ></path>
      <path
        stroke="#0b121f"
        d="M1.75 8H11"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );

  const ArrowIconWhite = () => (
    <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6" width="16" height="16" viewBox="-3 -3 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ffffff" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path>
        <path stroke="#ffffff" d="M1.75 8H11" strokeWidth="1.5" strokeLinecap="round"></path>
    </svg>
  );

export default function HeroWork() {
  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto">
        <div className="mb-8">
            <h5 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-8">
                Cyber workforce development plans baked <br className="hidden lg:block" />
                into the fabric and objectives of your organization.
            </h5>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Button asChild className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors">
                    <a href="https://www.hackthebox.com/business/contact-us" target="_blank">
                        Get a demo
                        <ArrowIcon />
                    </a>
                </Button>
                <Button asChild variant="outline" className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-5 rounded-md transition-colors text-base">
                    <a href="https://enterprise.hackthebox.com/create-company" target="_blank">
                        Start free trial
                    </a>
                </Button>
            </div>
        </div>

        <div className="mb-8">
            <div className="aspect-video">
                <iframe src="https://demo.arcade.software/b4VLzUIzD6jJlVwT6LaP?embed&amp;show_copy_link=true" title="HTB Enterprise: Reporting" frameBorder="0" loading="lazy" allowFullScreen className="w-full h-full"></iframe>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <a className="group" href="https://www.hackthebox.com/blog/customer-story-toyota" target="_blank">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-full flex flex-col justify-between relative hover:border-gray-500 transition-colors">
                    <div className="flex items-center justify-between pb-4">
                        <span className="text-sm text-gray-400">Case study</span>
                        <ArrowIconWhite />
                    </div>
                    <div className="pb-4">
                        <Image className="h-8 w-auto" src="https://www.hackthebox.com/images/landingv3/toyota-white-logo.png" alt="Toyota logo" width={120} height={32}
                             onError={(e) => { e.currentTarget.src = 'https://placehold.co/120x32/111927/FFFFFF?text=Toyota' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg leading-snug">
                            Discover how to bridge the knowledge gap between teams and prepare for any cyber incident.
                        </p>
                    </div>
                </div>
            </a>
            
            <a className="group" href="https://resources.hackthebox.com/hubfs/HTB%20Cybersecurity%20Professional%20Development%20Buyers%20Guide%202025.pdf" target="_blank">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-full flex flex-col justify-between relative hover:border-gray-500 transition-colors">
                    <div className="flex items-center justify-between pb-4">
                        <span className="text-sm text-gray-400">Why Hack The Box?</span>
                        <ArrowIconWhite />
                    </div>
                    <div className="pb-4">
                        <Image className="w-auto h-16" src="https://www.hackthebox.com/images/landingv3/book-icon.png" alt="book icon" width={62} height={64}
                             onError={(e) => { e.currentTarget.src = 'https://placehold.co/62x64/111927/FFFFFF?text=Guide' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg leading-snug">
                            High-performing cyber teams need to continuously adapt to new threats, benchmark skills, and retain talent.
                        </p>
                    </div>
                </div>
            </a>
        </div>
      </div>
    </section>
  );
}
