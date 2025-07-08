import React from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../utils/image";

const ImageComponent = ({ value }: { value: any }) => {
  const imageUrl =
    value.asset.url ||
    urlFor(value.asset).width(800).height(600).fit("max").auto("format").url();

  return (
    <div className="py-4 text-white my-4">
      <figure className="my-8">
        <img
          src={imageUrl}
          alt={value.alt || ""}
          className="w-full h-auto rounded-lg"
        />
        {value.caption && (
          <figcaption className="mt-2 font-body text-md text-gray-500 text-center italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

const components = {
  types: {
    image: ImageComponent,
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-body uppercase font-bold my-8">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-body font-bold my-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-body font-bold my-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-body font-bold my-3">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 font-body text-lg">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-400 pl-4 italic bg-purple-50 my-6 rounded-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 underline"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextRendererProps {
  value: any[];
}

export default function PortableTextRenderer({
  value,
}: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
