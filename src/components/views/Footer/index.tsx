import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <>
        <footer className="text-gray-500 body-font bg-gray-300 max-w-full px-4 md:px-10">
            <div className="container px-5 py-12 mx-auto flex md:items-start text-start  lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="space-y-6 w-80 flex-shrink-0 md:mx-0 mx-auto text-start md:text-left">
                    <Link href={"/"} className="flex title-font font-medium items-start md:justify-start justify-start text-gray-900">
                        <Image width={150} height={150} src={"/logo3.png"} alt="Logo" />
                    </Link>
                    <p className="mt-2">Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-start">
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font mb-4 text-xl text-black font-bold">Company</h2>
                        <nav className="list-none mb-10 space-y-4 leading-4">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">About</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">Terms of Use</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">Privacy Policy</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">How it Works</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font mb-4 text-xl text-black font-bold">Support</h2>
                        <nav className="list-none mb-10 space-y-4 leading-4">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">Support Carrer</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">24h Service</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">Quick Chat</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font mb-4 text-xl text-black font-bold">Contact</h2>
                        <nav className="list-none mb-10 space-y-4 leading-4">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">Whatsapp</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">Support 24h</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">Contact Us</a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
            <div className="bg-gray-800">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-white text-sm text-center sm:text-left">Copyright ©2023<a href="https://twitter.com/itsabdullahijaz" rel="noopener noreferrer" className="text-white ml-1" target="_blank">Abdullah Ijaz</a> | All Rights Reserved</p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                    <Link href={"https://www.facebook.com/abdullah.ijaz.332/"} className="w-5 h-5 ml-3 text-white">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </Link>
                        <Link href={"https://www.instagram.com/abdullahejaz.5/"} className="w-5 h-5 ml-3 text-white">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </Link>
                        <Link href={"https:github.com/Abdullahijazvu/"} className="w-5 h-5 ml-3 text-white">
                            <svg className="github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.43 9.8 8.2 11.37.6.11.82-.26.82-.58v-2.03c-3.34.73-4.03-1.61-4.03-1.61-.54-1.37-1.33-1.74-1.33-1.74-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .1-.8.42-1.31.77-1.61-2.69-.3-5.52-1.34-5.52-5.97 0-1.32.47-2.4 1.23-3.24-.14-.3-.53-1.54.1-3.22 0 0 1.02-.33 3.34 1.25.97-.26 2-.39 3.02-.4 1.02.01 2.05.14 3.02.4 2.32-1.57 3.34-1.25 3.34-1.25.63 1.68.24 2.92.12 3.22.77.84 1.22 1.91 1.22 3.24 0 4.64-2.83 5.67-5.53 5.96.43.37.82 1.11.82 2.24v3.32c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Footer