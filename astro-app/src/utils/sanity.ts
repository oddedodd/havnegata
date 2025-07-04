import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getCompanies(): Promise<Company[]> {
  return await sanityClient.fetch(
    groq`*[_type == "company" && defined(slug.current)] | order(name asc)`
  );
}

export async function getCompany(slug: string): Promise<Company> {
  return await sanityClient.fetch(
    groq`*[_type == "company" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}

export interface Company {
  _type: "company";
  _createdAt: string;
  name: string;
  slug: Slug;
  description?: string;
  tagline?: string;
  logo?: ImageAsset & { alt?: string };
  featuredImage?: ImageAsset & { alt?: string; caption?: string };
  imageGallery?: Array<ImageAsset & { alt?: string; caption?: string }>;
  bgColor?: string;
  links?: Array<{
    title?: string;
    url?: string;
  }>;
}
