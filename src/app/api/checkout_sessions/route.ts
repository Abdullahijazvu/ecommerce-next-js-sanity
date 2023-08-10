import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";

interface typeofData {
    price: string,
    name: string,
    quantity: number
}

let originalData:Array<typeofData> = [
    {
        price: 'price_1NdW5TJzfNYds1rfCFExjB3j',
        name: 'T-Shirt Next',
        quantity: 1
    },
    {
        price: 'price_1NdW4OJzfNYds1rfJTtpb2gv',
        name: 'Blue Shirt',
        quantity: 1
    },
    {
        price: 'price_1NdW2ZJzfNYds1rfKOD9wOaG',
        name: 'T-Shirt Ninja',
        quantity: 1
    },
    {
        price: 'price_1NdW07JzfNYds1rfhEl6d1yy',
        name: 'Hoodie Red',
        quantity: 1
    },
    {
        price: 'price_1NdVz0JzfNYds1rfLvu2Ws9r',
        name: 'Kids Shirt',
        quantity: 1
    },
    {
        price: 'price_1NdVy7JzfNYds1rfWXa6xWf1',
        name: 'Hoodie Black',
        quantity: 1
    },
    {
        price: 'price_1NdVvhJzfNYds1rfyZXNpFNg',
        name: 'Small',
        quantity: 1
    },
    {
        price: 'price_1Nd9y9JzfNYds1rfzrG3pFPw',
        name: 'T-Shirt Idea',
        quantity: 1
    }
]

//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req:NextRequest) {
    let cartItemsArray = await req.json()
    console.log(cartItemsArray);
    let line_item = originalData.filter((item: typeofData)=>{
        for (let index = 0; index < cartItemsArray.length; index++) {
            const element:oneProductType = cartItemsArray[index];
                if(element.productName === item.name){
                    return true
            }
            
        }
    })

    let line_itemToSend = line_item.map((item: typeofData)=>{
        return{
            price: item.price,
            quantity: item.quantity
        }
    })
    
    try {
        let session = await stripe.checkout.sessions.create({
            line_items: line_itemToSend,
            mode: "payment",
            success_url: `${req.nextUrl.origin}/?success=true`,
            cancel_url: `${req.nextUrl.origin}/?cancel=false`
        })
        console.log(session);
        return NextResponse.json({link: session.url})
    } catch (error) {
        console.log((error as {message: string}).message);
        return NextResponse.json({error})
    }
}