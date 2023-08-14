"use client"
import { IoMdClose } from "react-icons/io"
import { GiHamburgerMenu } from "react-icons/gi"
import { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { NavbarArray, NavbarItemType } from "@/components/utils/NavbarArrayAndTypes"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ContextWrapper from "@/global/context"
import Cartstate from "./subComponents/Cartstate"
import {v4 as uuidv4} from 'uuid'

const Navbar = () => {
    const router = useRouter();
    const [isNavbarOpen, setNavbarOpen] = useState<boolean>(false);
    
    useEffect(()=>{
    let user_id:any = window.localStorage.getItem('user_id');
    if(!user_id){
        user_id = uuidv4();
        window.localStorage.setItem('user_id',user_id);
    }
    (window as any).userid = user_id;
    console.log('user_id: ', (window as any).userid)
    },[])

    return (
        <ContextWrapper>
            <div className="sticky top-0 backdrop-blur-lg bg-gradient-to-tr from-white via-[#ffffffde] to-opacityDownColor z-20 max-w-7xl mx-auto px-4 md:px-10">
                <div className="py-4 flex justify-between items-center gap-8">
                    <Link href="/" className="flex-shrink-0">
                        <Image width={1000} height={1000} src={"/logo3.png"} alt="Logo" layout="responsive"/>
                    </Link>
                    <div className="hidden lg:flex justify-between items-center w-full">
                        <ul className="flex space-x-4 font-medium text-lg text-purple-950">
                            {NavbarArray.map((item: NavbarItemType, index: number) => (
                                <li key={index} className="flex items-center relative rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer group">
                                    <Link href={item.href} >{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="border flex items-center bg-white text-gray-600 pl-3 rounded-md" >
                                <BiSearch />
                            <input
                                type="text"
                                className="focus:outline-none pl-1 pr-5 py-1 w-80 rounded-r-md"
                                placeholder="Search in Our Store"
                            />
                        </div>
                        <Link href={"/cart"}>
                            <Cartstate />
                        </Link>
                    </div>
                    <div className="cursor-pointer" onClick={() => setNavbarOpen(!isNavbarOpen)}>
                        {isNavbarOpen ?
                            <div className="flex lg:hidden">
                                <IoMdClose size={29} />
                            </div>
                            :
                            <div className="flex lg:hidden">
                                <GiHamburgerMenu size={25} />
                            </div>
                        }
                    </div>
                </div>
                {
                    isNavbarOpen && <MobileNavbar />
                }
            </div>
        </ContextWrapper>
    )
}
export default Navbar

const MobileNavbar = () => {
    return (
        <div className="w-full px-6 py-4 bg-gray-100">
            {
                NavbarArray.map((item: NavbarItemType, index: number) => {
                    return (
                        <ul className='dropdown-menu' key={index}>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer" href="/female/Female">Female</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer" href="/male/Male">Male</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer" href="/kids">Kids</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 cursor-pointer" href="/products">All Products</a>
                            </li>
                      </ul>
                    )
                })
            }
        </div>
    )
}