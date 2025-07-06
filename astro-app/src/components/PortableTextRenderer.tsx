import React from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../utils/image";

const ImageComponent = ({ value }: { value: any }) => {
  console.log("🖼️ ImageComponent called with:", {
    hasAsset: !!value?.asset,
    assetUrl: value?.asset?.url,
    alt: value?.alt,
  });

  if (!value?.asset) {
    console.log("❌ No asset found in image component");
    return (
      <div style={{ padding: "1rem", background: "red", color: "white" }}>
        ❌ NO ASSET
      </div>
    );
  }

  const imageUrl =
    value.asset.url ||
    urlFor(value.asset).width(800).height(600).fit("max").auto("format").url();
  console.log("✅ Generated image URL:", imageUrl);

  return (
    <div
      style={{
        padding: "1rem",
        background: "green",
        color: "white",
        margin: "1rem 0",
      }}
    >
      🖼️ IMAGE COMPONENT WORKING!
      <figure style={{ margin: "2rem 0" }}>
        <img
          src={imageUrl}
          alt={value.alt || ""}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
        />
        {value.caption && (
          <figcaption
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: "#6b7280",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
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
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: 700,
          margin: "2rem 0 1rem 0",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          margin: "1.5rem 0 1rem 0",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          margin: "1rem 0 0.75rem 0",
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          margin: "0.75rem 0 0.5rem 0",
        }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p style={{ margin: "0 0 1rem 0" }}>{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        style={{
          borderLeft: "4px solid #a78bfa",
          paddingLeft: "1rem",
          fontStyle: "italic",
          background: "#f3e8ff",
          margin: "1.5rem 0",
          borderRadius: "0.5rem",
        }}
      >
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
        style={{ color: "#a78bfa", textDecoration: "underline" }}
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
