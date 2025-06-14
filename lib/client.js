import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '5ebhgc2m',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  autoGenerateArrayKeys: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);