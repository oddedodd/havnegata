import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
      ...,
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      ...,
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`,
    {
      slug,
    }
  );
}

export async function getCompanies(): Promise<Company[]> {
  return await sanityClient.fetch(
    groq`*[_type == "company" && defined(slug.current)] | order(name asc){
      ...,
      bgImage{
        ...,
        asset->
      },
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`
  );
}

export async function getCompany(slug: string): Promise<Company> {
  return await sanityClient.fetch(
    groq`*[_type == "company" && slug.current == $slug][0]{
      ...,
      bgImage{
        ...,
        asset->
      },
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`,
    {
      slug,
    }
  );
}

export async function getTilbud(): Promise<Tilbud[]> {
  return await sanityClient.fetch(
    groq`*[_type == "tilbud"] | order(_createdAt desc){
      ...,
      image{
        ...,
        asset->
      },
      company->
    }`
  );
}

export async function getAllTilbud(): Promise<Tilbud[]> {
  return await sanityClient.fetch(
    groq`*[_type == "tilbud"] | order(_createdAt desc){
      ...,
      image{
        ...,
        asset->
      },
      company->
    }`
  );
}

export async function getTilbudByCompany(
  companySlug: string
): Promise<Tilbud[]> {
  return await sanityClient.fetch(
    groq`*[_type == "tilbud" && company->slug.current == $companySlug] | order(_createdAt desc){
      ...,
      image{
        ...,
        asset->
      },
      company->
    }`,
    {
      companySlug,
    }
  );
}

export async function getTilbudBySlug(slug: string): Promise<Tilbud> {
  return await sanityClient.fetch(
    groq`*[_type == "tilbud" && slug.current == $slug][0]{
      ...,
      image{
        ...,
        asset->
      },
      company->
    }`,
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
  body: PortableTextBlock[];
  tagline?: string;
  textColor?: { hex: string };
  shadowColor?: { hex: string };
  logo?: ImageAsset & { alt?: string };
  featuredImage?: ImageAsset & { alt?: string; caption?: string };
  imageGallery?: Array<ImageAsset & { alt?: string; caption?: string }>;
  bgColor?: { hex: string };
  bgImage?: ImageAsset & { alt?: string };
  links?: Array<{
    title?: string;
    url?: string;
  }>;
}

export interface Tilbud {
  _type: "tilbud";
  _createdAt: string;
  name: string;
  slug: Slug;
  description?: string;
  price?: string;
  image?: ImageAsset & { alt?: string };
  company: Company;
  links?: Array<{
    title?: string;
    url?: string;
  }>;
}
