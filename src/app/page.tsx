import Image from 'next/image'
import Hero from '@/components/views/Hero'
import ProductType from '@/components/views/ProductType'

export default function Home() {
  return (
    <div>
      <Hero/>
      <ProductType/>
    </div>
  )
}
