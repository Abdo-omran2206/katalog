import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt , faExchangeAlt , faPaperPlane , faEnvelope , faPerson , faAnglesRight } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <nav className='flex relative items-center justify-between p-4 pr-10 text-white w-screen max-sm:pr-4'>
        <ul className='flex justify-between w-2xs max-sm:hidden'>
          <li><a href="#about" className='text-black'>About Us</a></li>
          <li><a href="#mission" className='text-black'>Our Mission</a></li>
          <li><a href="#services" className='text-black'>Services</a></li>
        </ul>
        <Image src="/logo.png" alt="Logo" width={100} height={100} className='absolute m-auto left-[47%] max-sm:relative max-sm:left-0 max-sm:m-0'/>
        <button className='bg-[#ced7de] text-black px-4 py-2 rounded hover:cursor-pointer'>
          Sign Up
        </button>
      </nav>

      <main className='max-sm:mt-20'>
        <section className='flex justify-center items-center w-screen h-screen max-sm:mb-10'>
          <div className='flex bg-[#f2f2f2] rounded-4xl overflow-hidden w-7xl h-[600px] flex-row max-sm:flex-col max-sm:mx-1.5 max-sm:h-[700px] max-sm:w-auto max-sm:m-auto'>
              <div className='w-[50%] p-10 gap-10 flex flex-col max-sm:w-full max-sm:gap-5'>
                <h1 className='text-7xl font-[var(--heading)] tracking-wide max-sm:text-4xl'>
                  Leave a Legacy of Love and Connection
                </h1>
                <p className='  font-[var(--body-font)]'>Katalog allows you to create heartfelt messages for your loved anes, delivered only after your passing. Experience peace of mind knowing your final thoughts will reach those who matter most.</p>
                <div>
                <div className='flex flex-row p-4 rounded-lg gap-3 max-sm:pl-0'>                   
                    <button className='hover:cursor-pointer bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-semibold shadow-md'>
                      Learn More
                    </button>                   
                    <button className='hover:cursor-pointer border-slate-700 border-2 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 font-semibold'>
                      Sign Up
                    </button>                 
                </div>
              </div>
              </div>
              <div className='w-[50%] max-sm:w-full'>
                <Image src="/background/default-7.jpg" alt='cover' width={1100} height={500} className='object-cover w-[100%] h-[100%] max-sm:w-full'/>
              </div>
          </div>
        </section>

        <section className='flex flex-col items-center justify-center w-screen bg-[#fafbfb] p-10 max-sm:p-3 max-sm:pb-15'>
          <div className='flex w-full h-full flex-col gap-2 items-center justify-center'>
            <div className='flex flex-row w-full h-full p-10 max-sm:flex-col max-sm:gap-6'>
              <div className='flex flex-col gap-4 w-[50%] p-5 max-sm:w-full max-sm:p-1'>
                <h2 className='font-[var(--heading)] text-2xl'>Legacy</h2>
                <h1 className='font-[var(--heading)] text-5xl tracking-wide'>Secure Your Messages, Deliver Your Love</h1>
              </div>
              <div className='flex flex-col gap-15 w-[50%] p-10 max-sm:w-full max-sm:p-1'>
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
                <div className='flex flex-row gap-7 mt-5'>
                  <button className='text-black border-1 px-5 py-3 hover:bg-slate-800 transition hover:cursor-pointer hover:text-white rounded-2xl duration-300 ease-in-out'>Learn More</button>
                  <button className="text-black rounded-2xl px-5 py-3 border border-transparent after:content-['>'] after:ml-2 hover:border-black hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out hover:cursor-pointer">Sign Up</button>

                </div>
              </div>
            </div>
              <Image src="/background/default-5.jpg" alt='cover' width={1100} height={300} className='object-cover w-[90%] h-180 rounded-4xl max-sm:h-80'/>
          </div>
        </section>

        <section className="flex flex-col items-center bg-white px-6 py-10 w-screen min-h-screen">

          <div className="text-center max-w-3xl mb-16">
            <h1 className="text-5xl font-semibold leading-tight max-sm:text-4xl">
              Discover how Katalog helps you leave
            </h1>
            <h2 className="text-4xl mt-4 text-gray-700 font-light max-sm:text-3xl">
              meaningful messages for loved ones.
            </h2>
          </div>


          <div className="flex flex-wrap gap-10 justify-center items-stretch w-full px-4">
            {/* Card 1 */}
            <div className="max-w-sm flex flex-col items-center text-center">
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
            </div>

            {/* Card 2 */}
            <div className="max-w-sm flex flex-col items-center text-center">
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
            </div>

            {/* Card 3 */}
            <div className="max-w-sm flex flex-col items-center text-center">
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
            </div>
          </div>
        </section>

         <section className='bg-gray-100 py-20 px-8'>
          <div className='max-w-7xl mx-auto'>
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
          </div>
        </section>

        <section className='flex w-screen h-screen items-center justify-center p-20 max-sm:p-10'>
          <div className='flex flex-row items-center justify-center gap-10 w-full h-full overflow-hidden p-20 max-sm:p-0 max-sm:flex-col'>
            <div className='flex flex-col justify-center text-white rounded-4xl h-full gap-10'>
              <h1 className='text-5xl'>Create Your Lasting Legacy</h1>
              <p>Join us today to craft heartfelt messages that will be cherished forever by your loved ones.</p>
              <div className='flex flex-row gap-5'>
                <button className='bg-[#ced7de] text-black px-7 py-3 rounded hover:bg-[#b6c2cb] transition-colors duration-200 hover:cursor-pointer'>Sign Up</button>
                <button className='bg-white text-black border border-gray-300 px-6 py-3 rounded hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 hover:cursor-pointer'>Learn More</button>

              </div>
            </div>
            <div className='h-full flex items-center justify-center'>
              <Image src="/background/default-2.jpg" alt="Description of image" width={1100} height={300} className='w-[100%] h-full object-cover rounded-4xl'/>
            </div>
          </div>
        </section>

        <section className='flex w-screen h-screen items-center justify-center p-20 py-0 max-sm:h-auto max-sm:px-0 max-sm:py-10'>
          <div className='flex flex-row items-center justify-center gap-10 w-full h-full overflow-hidden p-10 max-sm:flex-col max-sm:px-0'>
            <div className='flex flex-col justify-center text-white rounded-4xl h-full gap-10 w-[70%] max-sm:w-full max-sm:px-7'>
              <FontAwesomeIcon icon={faAnglesRight} className='text-black w-10' />
              <h1 className='text-5xl max-sm:text-4xl'>Empowering Connections Beyond Life's Final Chapter</h1>
              <p className='text-xl font-bold leading-relaxed'>At Katalog, we believe in the power of words to heal and connect. Our dedicated team is committed to providing a secure platform for creating lasting messages that bring comfort to loved ones.</p>
            </div>
            <div className='h-full flex items-center justify-center max-sm:p-5'>
              <Image src="/background/default-35.jpg" alt="Description of image" width={1100} height={300} className='w-[100%] h-full object-cover rounded-4xl'/>
            </div>
          </div>
        </section>
      </main>

      <footer className='overflow-hidden bg-[#f2f2f2] w-screen flex relative p-20 pb-5 flex-col max-sm:px-5 max-sm:py-10'>
          <div className='w-full flex flex-row justify-between max-sm:flex-col max-sm:gap-10'>
            <div className='w-[50%] flex flex-col gap-4 max-sm:w-full'>
              <Image src="/logo.svg" alt="Logo" width={1100} height={300} className='w-50 max-sm:w-40'/> 
              <p>Secure Your Messages, Deliver Your Love</p>
            </div>

            <div className='w-[50%] flex flex-row gap-20 max-sm:flex-col max-sm:w-full max-sm:gap-10'>
              <ul className='text-black flex flex-col gap-3'>
                <li><b>Explore More</b></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Contact Us</a></li>
                <li><a href="">Support Center</a></li>
              </ul>

              <ul className="text-black flex flex-col gap-3">
                <li><b>Security</b></li>
                <li><a href="#">Encryption</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>

            </div>
          </div>

          
          <div className='mt-30 max-sm:mt-8'>
            <hr className='bg-[rgba(0,0,0,0.3)] h-0.5' />
            <div className='flex flex-row justify-between items-center mt-5 max-sm:flex-col max-sm:items-start max-sm:gap-5'>
              <p className='text-gray-500 text-sm'>© {new Date().getFullYear()} Katalog. All rights reserved.</p>
              <ul className='text-black flex flex-row gap-2 max-sm:flex-col'>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Terms of Service</a></li>
                <li><a href="">Cookie Settings</a></li>
              </ul>
            </div>
          </div>
      </footer>
    </div>
  );
}
