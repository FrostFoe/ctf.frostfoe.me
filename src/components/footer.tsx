'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Typewriter = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const toRotate = ["hackers"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 200);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, toRotate]);

  return (
    <span className="inline-block">
      <span>{text}</span>
      <span className="animate-ping">|</span>
    </span>
  );
};


export default function Footer() {
  return (
    <section className="w-full max-w-7xl py-8">
      <div className="container mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="py-12 px-4 flex flex-col justify-center items-center">
            <div className="col-12 flex flex-col justify-center text-center">
              <h3 className="text-lime-400 text-5xl sm:text-7xl lg:text-8xl font-bold pb-4 mb-0">
                <span>4.1m+ </span>
                <Typewriter />
              </h3>
              <p className="text-base md:text-lg text-gray-300 pb-6 mb-0 max-w-md mx-auto">
                Chat about labs, share resources and jobs.<br className="hidden sm:block" /> Connect with 200k+ hackers from all over the world.
              </p>
              <a href="https://discord.com/invite/hackthebox" target="_blank" className="mb-10 inline-block">
                <Image
                  className="mx-auto"
                  src="https://www.hackthebox.com/images/landingv3/discord-button.svg"
                  alt="Join Discord"
                  width={200}
                  height={50}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x50/5865F2/FFFFFF?text=Join+Discord' }}
                />
              </a>
            </div>
            <div className="col-12 text-center">
              <a href="https://www.g2.com/products/hack-the-box/reviews" target="_blank">
                <Image
                  className="mx-auto"
                  src="https://www.hackthebox.com/images/landingv3/rating.png"
                  alt="G2 Rating"
                  width={195}
                  height={50}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/195x50/111927/FFFFFF?text=G2+Rating' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
