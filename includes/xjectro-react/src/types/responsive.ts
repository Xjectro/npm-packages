export type Breakpoint = "default" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ResponsiveObject<T> = Partial<Record<Breakpoint, T>>;

export type ResponsiveValue<T> = T | ResponsiveObject<T>;
