import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
  dataset: `${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
  apiVersion: "2023-07-20",
  useCdn: false
})