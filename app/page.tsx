'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt , faExchangeAlt , faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const variants = {
    initial1:{opacity:0,x:-100},
    initial2:{opacity:0,x:100},
    while:{opacity:1,x:0},
    initial:{opacity:0,y:50},
    animate:{opacity:1,y:0}
  }; 
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <motion.nav
      initial={{opacity:0 , y:-10}}
      animate={{opacity:1 , y:0}}
      transition={{duration:0.5}}
      className='flex relative items-center justify-between p-4 pr-10 text-white w-screen max-sm:pr-4'>
        <ul className='flex justify-between w-2xs max-sm:hidden'>
          <li><a href="#about" className='text-black'>About Us</a></li>
          <li><a href="#mission" className='text-black'>Our Mission</a></li>
          <li><a href="#services" className='text-black'>Services</a></li>
        </ul>
        <Image src="/logo.png" alt="Logo" width={100} height={100} className='absolute m-auto left-[47%] max-sm:relative max-sm:left-0 max-sm:m-0'/>
        <button onClick={() => {router.push('/login')}} className='bg-[#ced7de] text-black px-4 py-2 rounded hover:cursor-pointer'>
          Login
        </button>
      </motion.nav>

      <main className='max-sm:mt-10'>
        <section className='flex justify-center items-center w-screen min-h-screen max-sm:mb-10'>
          <motion.div 
          initial={{opacity:0, y:100}}
          animate={{opacity:1 , y:0}}
          transition={{duration:1}}
          className='flex bg-[#f2f2f2] rounded-4xl overflow-hidden w-7xl h-[600px] flex-row max-lg:w-[90%] max-md:h-auto max-sm:flex-col max-sm:m-2'>
            
            {/* Left Section */}
            <motion.div
            initial={{opacity:0,x:-100}}
            animate={{opacity:1,x:0}}
            transition={{duration:0.5,delay:1.2,ease:'easeOut'}}
            className='w-[50%] p-10 gap-10 flex flex-col justify-center max-sm:w-full max-sm:gap-6 max-sm:p-6'>
              <h1 className='text-7xl font-[var(--heading)] tracking-wide max-xl:text-5xl max-md:text-4xl max-sm:text-3xl'>
                Leave a Legacy of Love and Connection
              </h1>
              <p className='text-lg font-[var(--body-font)] max-sm:text-base'>
                Katalog allows you to create heartfelt messages for your loved ones, delivered only after your passing. Experience peace of mind knowing your final thoughts will reach those who matter most.
              </p>

              <div className='flex flex-row flex-wrap gap-3 mt-4 max-sm:pl-0'>
                <button className='hover:cursor-pointer bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-semibold shadow-md'>
                  Learn More
                </button>
                <button onClick={() => {router.push('/signup')}} className='hover:cursor-pointer border-slate-700 border-2 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 font-semibold'>
                  Sign Up
                </button>
              </div>
            </motion.div>

            {/* Right Section */}
            <div className='w-[50%] max-sm:w-full h-full'>
              <Image 
                src="/background/default-7.jpg" 
                alt='cover' 
                width={1100} 
                height={500} 
                className='object-cover w-full h-full max-h-[600px] max-sm:max-h-[300px] rounded-r-4xl max-sm:rounded-b-4xl max-sm:rounded-r-none' 
              />
            </div>
            
          </motion.div>
        </section>

        <section className='flex flex-col items-center justify-center w-screen bg-[#f2f2f2] p-10 max-sm:p-3 max-sm:pb-15'>
          <motion.div
          initial={{opacity:0,y:100}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.5}}
          viewport={{amount:0.1,once:true}}
           className='flex w-full h-full flex-col gap-2 items-center justify-center'>
            <div className='flex flex-row w-full h-full p-10 max-sm:flex-col max-sm:gap-6 max-lg:flex-col'>
              <div className='flex flex-col gap-4 w-[50%] p-5 max-sm:w-full max-sm:p-1 max-lg:w-full'>
                <h2 className='font-[var(--heading)] text-2xl'>Legacy</h2>
                <h1 className='font-[var(--heading)] text-5xl tracking-wide'>Secure Your Messages, Deliver Your Love</h1>
              </div>
              <div className='flex flex-col gap-15 w-[50%] p-10 max-sm:w-full max-sm:p-1 max-lg:w-full'>
                <p className=''>Katalog ensures your heartfelt messages are stored securely and delivered only to your loved ones after your passing. Experience peace of mind knowing your legacy will be shared in your own words.</p>
                <div className='flex flex-row gap-20 max-sm:flex-col'>
                  <div className='flex flex-col gap-2'>
                    <FontAwesomeIcon icon={faShieldAlt} className='text-black w-17 max-sm:w-13' />
                    <h3 className='text-2xl'>Secure Storage</h3>
                    <p className='text-sm'>Your messages are encrypted and safely stored until they are needed.</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <FontAwesomeIcon icon={faExchangeAlt} className='text-black w-17 max-sm:w-13' />
                    <h3 className='text-2xl'>Personalized Delivery</h3>
                    <p className='text-sm'>Choose when and how your messages are delivered to your chosen recipients.</p>
                  </div>
                </div>
                <div className='flex flex-row gap-7 mt-5 flex-wrap max-sm:gap-4'>
                  <button className='text-black border border-black px-5 py-3 hover:bg-slate-800 hover:text-white transition duration-300 ease-in-out rounded-2xl hover:cursor-pointer max-sm:p-3'>
                    Learn More
                  </button>
                  <button onClick={() => {router.push('/ReadMessage')}} className="text-black rounded-2xl px-5 py-3 border border-transparent after:content-['>'] after:ml-2 hover:border-black hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out hover:cursor-pointer max-sm:px-3">
                    Read message
                  </button>
                </div>

              </div>
            </div>
              <Image src="/background/default-5.jpg" alt='cover' width={1100} height={300} className='object-cover w-[90%] h-180 rounded-4xl max-sm:h-80'/>
          </motion.div>
        </section>

        <section className="flex flex-col items-center bg-white px-6 py-10 w-screen min-h-screen">

          <motion.div 
          initial={{opacity:0,y:-50}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.7}}
          viewport={{once:true,amount:0.8}}
          className="text-center max-w-3xl mb-16">
            <h1 className="text-5xl font-semibold leading-tight max-sm:text-4xl">
              Discover how Katalog helps you leave
            </h1>
            <h2 className="text-4xl mt-4 text-gray-700 font-light max-sm:text-3xl">
              meaningful messages for loved ones.
            </h2>
          </motion.div>


          <div className="flex flex-wrap gap-10 justify-center items-stretch w-full px-4">
            {/* Card 1 */}
            <motion.div
            variants={variants} 
            initial='initial'
            whileInView='animate'
            viewport={{once:true}}
            transition={{ duration: 0.5}}

            className="max-w-sm flex flex-col items-center text-center">
              <Image
                src="/background/default-11.jpg"
                alt="Create messages"
                width={400}
                height={300}
                className="object-cover w-full h-60 rounded-3xl shadow-md transition duration-300 hover:scale-105"
              />
              <h3 className="text-2xl font-semibold mt-5">
                Create, store, and deliver heartfelt messages after your passing.
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Katalog allows you to craft personal messages that are delivered posthumously.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
            variants={variants} 
            initial='initial'
            whileInView='animate'
            transition={{ duration: 0.5 , delay:1}}
            viewport={{once:true}}
            className="max-w-sm flex flex-col items-center text-center">
              <Image
                src="/background/default-27.jpg"
                alt="Multimedia formats"
                width={400}
                height={300}
                className="object-cover w-full h-60 rounded-3xl shadow-md transition duration-300 hover:scale-105"
              />
              <h3 className="text-2xl font-semibold mt-5">
                Easily create messages in text, audio, photo, or video formats.
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Choose recipients and set delivery times for your messages.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
            variants={variants} 
            initial='initial'
            whileInView='animate'
            transition={{ duration: 0.5 , delay:1.5}}
            viewport={{once:true}}
            className="max-w-sm flex flex-col items-center text-center">
              <Image
                src="/background/default-37.jpg"
                alt="Secure storage"
                width={400}
                height={300}
                className="object-cover w-full h-60 rounded-3xl shadow-md transition duration-300 hover:scale-105"
              />
              <h3 className="text-2xl font-semibold mt-5">
                Your messages are securely stored until they are needed.
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Rest assured, your messages will only be sent after verification of your passing.
              </p>
            </motion.div>
          </div>
        </section>

         <section className='bg-gray-100 py-20 px-8'>
          <motion.div 
          initial={{opacity:0,x:-100}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true,amount:0.4}}
          transition={{duration:0.8}}
          className='max-w-7xl mx-auto'>
            <h1 className='text-6xl font-light text-gray-900 mb-20 leading-tight max-sm:text-4xl'>
              Explore Our Thoughtful Features for Lasting<br />
              Connections Beyond Life
            </h1>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-16'>
              {/* First Feature */}
              <div className='flex flex-col gap-6'>
                <div className='w-16 h-16 flex items-center justify-center'>
                  <svg className='w-12 h-12 text-gray-900' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/>
                  </svg>
                </div>
                <h3 className='text-2xl font-light text-gray-900 leading-snug'>
                  Create, Schedule, and Deliver<br />
                  Messages with Ease and Security
                </h3>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  Our platform allows you to craft heartfelt messages in various formats.
                </p>
              </div>

              {/* Second Feature */}
              <div className='flex flex-col gap-6'>
                <div className='w-16 h-16 flex items-center justify-center'>
                  <svg className='w-12 h-12 text-gray-900' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.1C15 7.1 14.9 7 14.8 6.9L13.8 5.9C13.3 5.4 12.7 5.1 12 5.1S10.7 5.4 10.2 5.9L9.2 6.9C9.1 7 9 7.1 9 7.1L3 7V9H7V22H9V16H15V22H17V9H21Z'/>
                  </svg>
                </div>
                <h3 className='text-2xl font-light text-gray-900 leading-snug'>
                  Empower Your Loved Ones with a<br />
                  Trusted Digital Trustee System
                </h3>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  Designate a trusted individual to manage your messages after your passing.
                </p>
              </div>

              {/* Third Feature */}
              <div className='flex flex-col gap-6'>
                <div className='w-16 h-16 flex items-center justify-center'>
                  <svg className='w-12 h-12 text-gray-900' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z'/>
                  </svg>
                </div>
                <h3 className='text-2xl font-light text-gray-900 leading-snug'>
                  Seamless Delivery Methods for Your<br />
                  Messages When It Matters Most
                </h3>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  Choose how and when your messages are delivered to recipients.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className='flex w-screen min-h-screen items-center justify-center p-20 max-xl:p-14 max-lg:p-10 max-sm:p-6'>
          <div className='flex flex-row items-center justify-center gap-10 w-full h-full overflow-hidden max-lg:flex-col max-lg:p-0'>
            <motion.div 
            variants={variants}
            initial='initial1'
            whileInView='while'
            transition={{duration:0.5}}
            viewport={{once:true,amount:0.5}}
            className='flex flex-col justify-center text-white rounded-4xl w-[100%] gap-10 max-lg:w-full max-lg:px-4'>
              <h1 className='text-5xl max-md:text-4xl max-sm:text-3xl'>Create Your Lasting Legacy</h1>
              <p className='text-lg max-sm:text-base'>Join us today to craft heartfelt messages that will be cherished forever by your loved ones.</p>
              <div className='flex flex-row gap-5 flex-wrap'>
                <button onClick={() => {router.push('/login')}} className='bg-[#ced7de] text-black px-7 py-3 rounded hover:bg-[#b6c2cb] transition-colors duration-200 hover:cursor-pointer'>Login</button>
                <button className='bg-white text-black border border-gray-300 px-6 py-3 rounded hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 hover:cursor-pointer'>Learn More</button>
              </div>
            </motion.div>
            <motion.div 
            initial='initial2'
            whileInView='while'
            transition={{duration:0.5}}
            viewport={{once:true,amount:0.5}}
            className='h-full flex items-center justify-center w-full max-lg:mt-10'>
              <Image src="/background/default-2.jpg" alt="Description of image" width={1100} height={300} className='w-full h-full max-h-[400px] object-cover rounded-4xl' />
            </motion.div>
          </div>
        </section>

        <section className='flex w-screen min-h-screen items-center justify-center px-20 py-0 max-xl:px-14 max-lg:px-10 max-sm:px-4 max-sm:py-10'>
          <div className='flex flex-row items-center justify-center gap-10 w-full overflow-hidden max-lg:flex-col'>
            <motion.div 
            variants={variants}
            initial='initial1'
            whileInView='while'
            transition={{duration:0.5}}
            viewport={{once:true,amount:0.5}}
            className='flex flex-col justify-center text-white rounded-4xl gap-10 w-[70%] max-lg:w-full max-lg:px-4'>
              <FontAwesomeIcon icon={faAnglesRight} className='text-black w-10' />
              <h1 className='text-5xl max-md:text-4xl max-sm:text-3xl'>Empowering Connections Beyond Life&apos;s Final Chapter</h1>
              <p className='text-xl font-bold leading-relaxed max-md:text-lg max-sm:text-base'>
                At Katalog, we believe in the power of words to heal and connect. Our dedicated team is committed to providing a secure platform for creating lasting messages that bring comfort to loved ones.
              </p>
            </motion.div>
            <motion.div 
            initial='initial2'
            whileInView='while'
            transition={{duration:0.5}}
            viewport={{once:true,amount:0.5}}
            className='h-full flex items-center justify-center w-full max-lg:mt-10'>
              <Image src="/background/default-35.jpg" alt="Description of image" width={1100} height={300} className='w-full h-full max-h-[400px] object-cover rounded-4xl' />
            </motion.div>
          </div>
        </section>

      </main>

      <footer className='bg-[#f2f2f2] w-full flex flex-col p-4 md:p-8 lg:p-12 xl:p-20 pb-4 md:pb-6'>
        <div className='w-full flex flex-col lg:flex-row justify-between gap-8 md:gap-10 lg:gap-16'>
          <div className='w-full lg:w-1/2 flex flex-col gap-3 md:gap-4'>
            <Image src="/logo.svg" alt="Logo" width={1100} height={300} className='w-32 md:w-40 lg:w-48 xl:w-52'/> 
            <p className='text-sm md:text-base text-gray-700'>Secure Your Messages, Deliver Your Love</p>
          </div>

          <div className='w-full lg:w-1/2 flex flex-col sm:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20'>
            <ul className='text-black flex flex-col gap-2 md:gap-3'>
              <li className='font-bold text-sm md:text-base'>Explore More</li>
              <li><a href="#" className='text-sm md:text-base hover:text-gray-600 transition-colors'>About Us</a></li>
              <li><a href="#" className='text-sm md:text-base hover:text-gray-600 transition-colors'>Contact Us</a></li>
              <li><a href="#" className='text-sm md:text-base hover:text-gray-600 transition-colors'>Support Center</a></li>
            </ul>

            <ul className="text-black flex flex-col gap-2 md:gap-3">
              <li className='font-bold text-sm md:text-base'>Security</li>
              <li><a href="#" className='text-sm md:text-base hover:text-gray-600 transition-colors'>Encryption</a></li>
              <li><a href="#" className='text-sm md:text-base hover:text-gray-600 transition-colors'>Privacy</a></li>
              <li><a href="#" className='text-sm md:text-base hover:text-gray-600 transition-colors'>Terms</a></li>
            </ul>
          </div>
        </div>

        <div className='mt-8 md:mt-12 lg:mt-16 xl:mt-20'>
          <hr className='bg-gray-400 h-px border-0' />
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mt-4 md:mt-6 gap-4 md:gap-0'>
            <p className='text-gray-500 text-xs md:text-sm'>© {new Date().getFullYear()} Katalog. All rights reserved.</p>
            <ul className='text-black flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-6'>
              <li><a href="#" className='text-xs md:text-sm hover:text-gray-600 transition-colors'>Privacy Policy</a></li>
              <li><a href="#" className='text-xs md:text-sm hover:text-gray-600 transition-colors'>Terms of Service</a></li>
              <li><a href="#" className='text-xs md:text-sm hover:text-gray-600 transition-colors'>Cookie Settings</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
