"use client"
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { cartContext } from "@/global/context"
import Image from "next/image"
import { FC, useContext, useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import AllProductsCompo from "../../AllProduct"
import { client } from "../../../../../sanity/lib/client"
import imageUrlBuilder from '@sanity/image-url'
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import BASE_PATH_FORAPI from "@/components/shared/Wrapper/BasePath"
import LoadingComp from "@/components/shared/Wrapper/LoadingComp"
import { uuid } from "drizzle-orm/pg-core"

const builder: any = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source)
}
const notificationError = (title: string) => {
    toast(title, {
        position: "top-right"
    })
};

const CartComp = ({ allProductsOfStore }: { allProductsOfStore: Array<oneProductType> }) => {
    const [loadings, setLoadings] = useState<boolean>(false);
    const [allProductsForCart, setAllProductsForCart] = useState<any>();
    let { cartArray, dispatch, loading, setLoading } = useContext(cartContext)
    const [totalPrice, setTotalPrice] = useState(0);
    const [emptyCart, setEmptyCart] = useState(false);
    let router = useRouter();

    useEffect(() => {
        if (cartArray.length !== 0) {
            // const cartData = cartArray.filter((value, index, array) => {
            //     if(array.indexOf(value) === index){
            //         // retrun true;
            //     }
            // });
            
            let data = allProductsOfStore.filter((item: oneProductType, currentIndex:number) => {
                for (let index = 0; index < cartArray.length; index++) {
                    let element: any = cartArray[index];
                    if (element.product_id === item._id) {
                        allProductsOfStore[currentIndex].quantity=element.quantity;
                        return true;
                    };
                };
            });
            setAllProductsForCart(data)
            setEmptyCart(false);
        }else{
            if(cartArray.length==0)
            setAllProductsForCart([])
            setEmptyCart(true)
        }
    }, [cartArray])

    function PriceSubTotal() {
        let orignalToSend: number = 0;
        allProductsForCart && allProductsForCart.forEach((element: oneProductType) => {
            let subTotalPrice = element.quantity * element.price;
            orignalToSend = orignalToSend + subTotalPrice;
        });
        if (orignalToSend !== 0) {
            setTotalPrice(orignalToSend);
            router.refresh();
        }
    }

    useEffect(() => {
        PriceSubTotal();
    }, [allProductsForCart])

    function handleRemove(product_id: string, user_id:string) {
        // let user_id = "ccafa11d-b3e5-4fa9-ac24-23073f6fef21"
        dispatch("removeFromCart", { product_id, user_id });
    }
    useEffect(() => {
        if (cartArray.length !== 0 ) {
            let data = allProductsOfStore.filter((item: oneProductType) => {
                for (let index = 0; index < cartArray.length; index++) {
                    let element: any = cartArray[index];
                    if (element.product_id === item._id) {
                        return true
                    };
                };
            });
            setAllProductsForCart(data)
            for (let index = 0; index < cartArray.length; index++) {
                const element = cartArray[index];
                    let subTotalPrice = element.quantity * element.price
                    if(subTotalPrice){
                        setTotalPrice(totalPrice+subTotalPrice)
                    }
            }
        }
    }, [cartArray])

    async function handleDecrementByOne(product_id: string, price: any) {
        let stableQuantity: number = 0;
        cartArray.forEach((element: any) => {
            if (element.product_id == product_id) {
                stableQuantity = element.quantity
            }
        });

        if (stableQuantity - 1 <= 0) {
            notificationError("Did not accept lower than 1")
        } else {
            await dispatch("updateCart", {
                product_id: product_id,
                quantity: stableQuantity - 1,
                user_id: (window as any).userid,
                price: price
            });
            notificationError("Decremented by One")
            PriceSubTotal()
        }
    }
    async function handleIncrementByOne(product_id: string, price: any) {
        let stableQuantity: number = 0;
        cartArray.forEach((element: any) => {
            if (element.product_id == product_id) {
                stableQuantity = element.quantity
            }
        });
        console.log("previous quantity", stableQuantity);
        
        await dispatch("updateCart", {
            product_id: product_id,
            quantity: stableQuantity + 1,
            user_id: (window as any).userid,
            price:price
        });
        notificationError("Incremented by One");
        PriceSubTotal()
    }

    async function handleProcessCheckout() {
        setLoadings(true);
        let linkOrg: any = await fetch(`/api/checkout_sessions`, {
            method: "POST",
            body: JSON.stringify(allProductsForCart)
        })
        if (linkOrg) {
            let { link } = await linkOrg.json()
            window.location.href = link
        }
        setLoadings(false);
    }

    return (
        <div className="py-10 px-4 md:px-10">
            <Toaster />
            {/* first */}
            <div className="py-6">
                <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
            </div>
            {/* second */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col basis-[69%] gap-4">
                    {!emptyCart && allProductsForCart && allProductsForCart.map((item: oneProductType, index: number) => {
                        return (
                            <div key={index} className=" flex flex-shrink-0 gap-6">
                                <div className="w-[14rem]">
                                    <Image className="rounded-xl" width={1000} height={1000} src={urlFor(item.image[0]).width(1000).height(1000).url()} alt={item.image[0].alt} />
                                </div>
                                <div className="space-y-1 md:space-y-3 w-full">
                                    <div className="flex justify-between">
                                        <h2 className="md:text-2xl font-light text-gray-700">{item.productName}</h2>
                                        
                                        {loading ? <LoadingComp size={"w-10"} /> :
                                            <div className="cursor-pointer" onClick={() => handleRemove(item._id, (window as any).userid)}>
                                                <RiDeleteBin6Line size={28} />
                                            </div>
                                        }
                                    </div>
                                    <p className="text-gray-400 font-medium">{item.productTypes[1] ? item.productTypes[1] : "All"}</p>
                                    <h3 className="text-sm md:text-base">Delivery Estimation</h3>
                                    <h4 className="text-orange-400 font-semibold md:text-xl">5 Working Days</h4>
                                    <div className="flex justify-between">
                                        <p className="font-semibold md:text-lg">{"$"}{item.price}</p>
                                        <div className={`flex gap-2 ${loading ? "opacity-25" : "opacity-100"} items-center text-lg`}>
                                            <button
                                                onClick={() => handleDecrementByOne(item._id, item.price)}
                                                className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200">
                                                -
                                            </button>
                                            {/* <p>{item.quantity}</p> */}
                                            <p>
                                                {
                                                    cartArray.map((subItem:any)=>{
                                                        let matching = subItem.product_id === item._id
                                                        let quantity = subItem.quantity
                                                        if(matching){
                                                            return quantity
                                                        } else{
                                                            return ""
                                                        }
                                                    })
                                                }
                                            </p>
                                            <button
                                                onClick={() => handleIncrementByOne(item._id, item.price)}
                                                disabled={loading}
                                                className="border select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full  border-gray-800"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } )}
                        {/* // !userData ? (
                        //     <div className="text-center font-semibold text-gray-800 text-xl">Please login First</div>
                        // )  */}
                        
                           {!emptyCart && !allProductsForCart && arrayForLoading.map((index: number) => (
                                <div key={index} className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
                                    <div className="flex animate-pulse gap-4">
                                        <div className="bg-slate-200 rounded-lg h-32 w-4/12"></div>
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                            <div className="h-8 w-16 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                </div>
                {!emptyCart &&
                <div className="basis-1/4 space-y-6 px-6">
                    <h6 className="font-semibold text-xl">Order Summary</h6>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">Quantity:</p>
                        <p>{cartArray.length} Products</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">Subtotal:</p>
                        <p>${totalPrice}</p>
                    </div>
                    <button
                        onClick={handleProcessCheckout}
                        className="text-white bg-gray-900 border border-gray-500 px-4 py-2 w-full">
                        {loadings ? "Loading..." :
                            "Process to Checkout"
                        }
                    </button>
                </div>}
                {emptyCart &&
                <div className="basis-1/4 space-y-6 px-6">
                    <h6 className="font-semibold text-xl center">Cart is empty!</h6>
                </div>}
            </div>
        </div>
    )
}
export default CartComp

let arrayForLoading = [1, 2, 3, 4]