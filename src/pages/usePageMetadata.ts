import { useEffect } from "react";

interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  imageAlt?: string;
  type?: string;
}

function upsertMeta(
  selector: string,
  attributes: Record<string, string>,
): () => void {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  const meta = element ?? document.createElement("meta");
  const previousAttributes = new Map<string, string | null>(
    Object.keys(attributes).map((name) => [name, meta.getAttribute(name)]),
  );

  Object.entries(attributes).forEach(([name, value]) => {
    meta.setAttribute(name, value);
  });

  if (!element) {
    document.head.appendChild(meta);
  }

  return () => {
    if (!element) {
      meta.remove();
      return;
    }

    previousAttributes.forEach((value, name) => {
      if (value === null) {
        meta.removeAttribute(name);
      } else {
        meta.setAttribute(name, value);
      }
    });
  };
}

function upsertCanonical(href: string): () => void {
  const element =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const link = element ?? document.createElement("link");
  const previousHref = link.getAttribute("href");

  link.setAttribute("rel", "canonical");
  link.setAttribute("href", href);

  if (!element) {
    document.head.appendChild(link);
  }

  return () => {
    if (!element) {
      link.remove();
    } else if (previousHref === null) {
      link.removeAttribute("href");
    } else {
      link.setAttribute("href", previousHref);
    }
  };
}

function toAbsoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${window.location.origin}${value.startsWith("/") ? value : `/${value}`}`;
}

export function usePageMetadata({
  title,
  description,
  canonicalPath,
  image = "/site/home/hero.webp",
  imageAlt = "Colorful artwork by Paige Cook for Psychedelic Queen Artistry",
  type = "website",
}: PageMetadata): void {
  useEffect(() => {
    const previousTitle = document.title;
    const canonicalHref = toAbsoluteUrl(canonicalPath);
    const imageUrl = toAbsoluteUrl(image);
    const cleanup = [
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: description,
      }),
      upsertMeta('meta[property="og:title"]', {
        property: "og:title",
        content: title,
      }),
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      }),
      upsertMeta('meta[property="og:type"]', {
        property: "og:type",
        content: type,
      }),
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: canonicalHref,
      }),
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: imageUrl,
      }),
      upsertMeta('meta[property="og:image:alt"]', {
        property: "og:image:alt",
        content: imageAlt,
      }),
      upsertMeta('meta[name="twitter:card"]', {
        name: "twitter:card",
        content: "summary_large_image",
      }),
      upsertMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: title,
      }),
      upsertMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: description,
      }),
      upsertMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: imageUrl,
      }),
      upsertCanonical(canonicalHref),
    ];

    document.title = title;

    return () => {
      document.title = previousTitle;
      cleanup.forEach((restore) => restore());
    };
  }, [canonicalPath, description, image, imageAlt, title, type]);
}
