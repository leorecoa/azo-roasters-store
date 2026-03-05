export type Theme = {
  primary: string;
  secondary: string;
  glow: string;
  text: string;
  bg: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  category: "cafe" | "acessorio" | "curso";
  active: boolean;
  image_path?: string | null;
  theme: Theme;
};

export type Variant = {
  id: string;
  product_id: string;
  sku?: string | null;
  name: string;
  price_cents: number;
  stock?: number | null;
  attributes: Record<string, unknown>;
  active: boolean;
};
