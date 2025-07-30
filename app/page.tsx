import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt , faExchangeAlt , faPaperPlane , faEnvelope , faPerson} from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <nav className='flex relative items-center justify-between p-4 pr-10 text-white w-screen'>
        <ul className='flex justify-between w-2xs'>
          <li><a href="#about" className='text-black'>About Us</a></li>
          <li><a href="#mission" className='text-black'>Our Mission</a></li>
          <li><a href="#services" className='text-black'>Services</a></li>
        </ul>
        <Image src="/logo.png" alt="Logo" width={100} height={100} className='absolute m-auto left-[47%]'/>
        <button className='bg-[#ced7de] text-black px-4 py-2 rounded hover:cursor-pointer'>
          Sign Up
        </button>
      </nav>

      <main>
        <section className='flex justify-center items-center w-screen h-screen '>
          <div className='flex bg-[#f2f2f2] rounded-4xl overflow-hidden w-7xl h-[600px] flex-row'>
              <div className='w-[50%] p-10 gap-10 flex flex-col'>
                <h1 className='  text-7xl font-[var(--heading)] tracking-wide'>
                  Leave a Legacy of Love and Connection
                </h1>
                <p className='  font-[var(--body-font)]'>Katalog allows you to create heartfelt messages for your loved anes, delivered only after your passing. Experience peace of mind knowing your final thoughts will reach those who matter most.</p>
                <div>
                <div className='flex flex-row p-4 rounded-lg gap-3'>                   
                    <button className='hover:cursor-pointer bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-semibold shadow-md'>
                      Learn More
                    </button>                   
                    <button className='hover:cursor-pointer border-slate-700 border-2 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 font-semibold'>
                      Sign Up
                    </button>                 
                </div>
              </div>
              </div>
              <div className='w-[50%]'>
                <Image src="/background/default-7.jpg" alt='cover' width={1100} height={500} className='object-cover w-[100%] h-[100%]'/>
              </div>
          </div>
        </section>

        <section className='flex flex-col items-center justify-center w-screen bg-[#fafbfb] p-10'>
          <div className='flex w-full h-full flex-col gap-2 items-center justify-center'>
            <div className='flex flex-row w-full h-full p-10'>
              <div className='flex flex-col gap-4 w-[50%] p-5'>
                <h2 className='font-[var(--heading)] text-2xl'>Legacy</h2>
                <h1 className='font-[var(--heading)] text-5xl tracking-wide'>Secure Your Messages, Deliver Your Love</h1>
              </div>
              <div className='flex flex-col gap-15 w-[50%] p-10'>
                <p className=''>Katalog ensures your heartfelt messages are stored securely and delivered only to your loved ones after your passing. Experience peace of mind knowing your legacy will be shared in your own words.</p>
                <div className='flex flex-row gap-20'>
                  <div className='flex flex-col gap-2'>
                    <FontAwesomeIcon icon={faShieldAlt} className='text-black w-15' />
                    <h3 className='text-2xl'>Secure Storage</h3>
                    <p className='text-sm'>Your messages are encrypted and safely stored until they are needed.</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <FontAwesomeIcon icon={faExchangeAlt} className='text-black w-15' />
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
              <Image src="/background/default-5.jpg" alt='cover' width={1100} height={300} className='object-cover w-[90%] h-180 rounded-4xl'/>
          </div>
        </section>

        <section className="flex flex-col items-center bg-white px-6 py-10 w-screen min-h-screen">

          <div className="text-center max-w-3xl mb-16">
            <h1 className="text-5xl font-semibold leading-tight">
              Discover how Katalog helps you leave
            </h1>
            <h2 className="text-4xl mt-4 text-gray-700 font-light">
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

        <section className='flex flex-col items-center justify-center bg-[#fafafa] p-10 pt-35 w-screen h-screen'>
          <div className='bg-amber-300 w-full h-full rounded-4xl flex flex-col gap-10'>
            <div className='flex flex-col w-[90%] gap-10'>
              <h1 className='text-5xl tracking-wide'>Explore Our Thoughtful Features for Lasting <br />Connections Beyond Life</h1>
            </div>
            <div className='flex flex-row w-screen mt-20'>
              <div>
                <FontAwesomeIcon icon={faPaperPlane} className='w-10 text-black'/>
                <h3>Create, Schedule, and Deliver Messages with Ease and Security</h3>
                <p>Our platform allows you to craft heartfelt messages in various formats.</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faPerson} className='w-10 text-black'/>
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} className='w-10 text-black'/>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
