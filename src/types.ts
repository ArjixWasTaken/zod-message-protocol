import { z } from "zod";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type EventsConfigToDiscriminatedUnion<T extends Record<string, z.ZodRawShape>> = {
  [K in keyof T]: Prettify<
    {
      type: K;
    } & Omit<z.infer<z.ZodObject<T[K]>>, "type">
  >;
}[keyof T];
