import Image from 'next/image'
import Hero from '@/components/views/Hero'
import ProductType from '@/components/views/ProductType'
import BASE_PATH_FORAPI from '@/components/shared/Wrapper/BasePath'
import ProductsCarosel from '@/components/views/ProductsCarosel'

async function fetchAllProductsData() {
  let res = await fetch(`${BASE_PATH_FORAPI}/api/products`)
  if(!res){
    throw new Error("Failed to fetch")
  }
  return res.json()
}

export default async function Home() {
  let {response} = await fetchAllProductsData()
  return (
    <div>
      <Hero/>
      <ProductType/>
      <ProductsCarosel ProductData={response}/>
    </div>
  )
}
