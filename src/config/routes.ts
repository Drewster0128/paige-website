export const ROUTES = {
  about: "/about",
  contact: "/contact",
  contactInquiry: "/contact",
  events: "/events",
  gallery: "/gallery",
  home: "/",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
} as const;

export const PRIMARY_NAV_LINKS = [
  { label: "Home", to: ROUTES.home, end: true },
  { label: "Gallery", to: ROUTES.gallery, end: false },
  { label: "About", to: ROUTES.about, end: false },
  { label: "Events", to: ROUTES.events, end: false },
  { label: "Contact", to: ROUTES.contact, end: false },
] as const;

export const LEGAL_NAV_LINKS = [
  { label: "Privacy Policy", to: ROUTES.privacyPolicy },
  { label: "Terms of Service", to: ROUTES.termsOfService },
] as const;
