import { Link } from 'react-router-dom'
export default function Footer(){
    return (
        <footer className='border-y border-gray-700 shadow mt-5'>
            <div className='mx-auto px-5  w-full max-w-screen-xl p-4 py-6 lg:py-8'>
                <div className="md:flex md:justify-between">
                    <div className="md:mb-0 mt-14">
                        <Link to="/" className="flex items-center">
                            <span><h1 className="text-4xl text-red-400 mr-3 h-12">KickStart</h1></span>
                        </Link>
                    </div>
                    <div className="mb-6 md:mb-0 block">
                        <div>
                            <h2 className='text-xl text-customYellow text-center'>Resources</h2>
                        </div>
                        <div className="py-2 align-top">
                            <ul className="">
                                <li className='flex m-auto gap-10'>
                                    <Link to = '/'>
                                        <h2 className="text-2xl text-center text-gray-400 hover:text-gray-200">Home</h2>
                                    </Link>
                                </li>
                                <li className='flex m-auto gap-10'>
                                    <Link to = '/about'>
                                        <h2 className="text-2xl text-center text-gray-400 hover:text-gray-200">About</h2>
                                    </Link>
                                </li>
                                <li className='flex m-auto gap-10'>
                                    <Link to = '/contact'>
                                        <h2 className="text-2xl text-center text-gray-400 hover:text-gray-200">Contact</h2>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mb-6 md:mb-0 block">
                        <div>
                            <h2 className='text-xl text-customYellow text-center'>Team Members</h2>
                        </div>
                        <div className="py-2 align-top">
                            <ul className="">
                                <li className='flex m-auto gap-10'>
                                    <h3 className="text-2xl text-gray-400 w-4/5">Amrit Kandel </h3>
                                    <a className='py-1' href="https://www.facebook.com/profile.php?id=100005796978453">
                                        <img src="/facebook_6422199.svg" alt="facebook svg"  className='w-6'/>
                                    </a>
                                </li>
                                <li className='flex m-auto gap-10'>
                                    <h3 className="text-2xl text-gray-400 w-4/5">Kiman Adhikari</h3>
                                    <a className='py-1' href="https://www.facebook.com/profile.php?id=100074568813588">
                                        <img src="/facebook_6422199.svg" alt="facebook svg"  className='w-6'/>
                                    </a>
                                </li>
                                <li className='flex m-auto gap-10'>
                                    <h3 className="text-2xl text-gray-400 w-4/5">Mingmar Sherpa</h3>
                                    <a className='py-1' href="https://www.facebook.com/sherpa.mingmar.56">
                                        <img src="/facebook_6422199.svg" alt="facebook svg"  className='w-6'/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-6 md:mb-0 block">
                        <div className='mr-10'>
                            <h2 className='text-xl text-customYellow text-center'>Tools</h2>
                        </div>
                        <div className="py-2 align-top">
                            <ul className="">
                                <li className='flex m-auto gap-10'>
                                    <a href = 'https://react.dev/'>
                                        <h2 className="text-2xl text-center text-gray-400 hover:text-gray-200">ReactJs</h2>
                                    </a>
                                </li>
                                <li className='flex m-auto gap-10'>
                                    <a href = 'https://nodejs.org/en'>
                                        <h2 className="text-2xl text-center text-gray-400 hover:text-gray-200">Node.js</h2>
                                    </a>
                                </li>
                                <li className='flex m-auto gap-10'>
                                    <a href = 'https://www.postgresql.org/'>
                                        <h2 className="text-2xl text-center text-gray-400 hover:text-gray-200">PostgreSql</h2>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* last line */}
                <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-xl text-center text-gray-500 sm:text-center m-auto">
                        © 2024 {" "}
                        <a href="/" className="hover:underline">
                            KickStart
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}