import type { ZodType, z } from 'zod';

/**
 * A QR type is a declarative module: a schema, a serializer, and the metadata
 * needed to build its page.
 *
 * Everything that varies per type lives here. Navigation, the tool hub, the
 * sitemap, internal links and related-type links are all derived from the
 * registry rather than maintained by hand, so adding a type cannot leave a
 * half-wired page behind.
 *
 * The icon is stored as a name, not a component: this module is imported by
 * pure serialization code and by build-time scripts, and neither should pull an
 * icon library into its bundle.
 */
export interface QrTypeSeo {
  /** <title> and H1 source. Should contain the target keyword verbatim. */
  readonly title: string;
  readonly description: string;
  /** Primary keyword this page is built to rank for. */
  readonly keyword: string;
}

/**
 * Parameterised by the schema rather than by the payload shape.
 *
 * The payload is derived from the schema with `z.infer`, so there is exactly
 * one declaration of the shape and no interface to drift out of sync. Going the
 * other way -- declaring the data type and typing the schema as
 * `ZodType<TData>` -- does not type-check under Zod 4, whose generics carry
 * input, output and internal parameters that a bare `ZodType<TData>` cannot
 * satisfy.
 */
export interface QrTypeDefinition<TSchema extends ZodType = ZodType> {
  readonly id: string;
  readonly label: string;
  /** Site-absolute path, e.g. `/wifi-qr-code`. */
  readonly route: string;
  /** Lucide icon name, resolved in the UI layer. */
  readonly icon: string;
  readonly schema: TSchema;
  /**
   * Prefilled demo data so a type page is never blank on arrival. An empty tool
   * reads as broken and gives the visitor nothing to react to.
   */
  readonly example: z.infer<TSchema>;
  readonly seo: QrTypeSeo;
  /** Ids of sibling types to cross-link. Validated by the registry tests. */
  readonly related: readonly string[];
  /** Validated payload -> the exact string encoded into the QR symbol. */
  readonly serialize: (data: z.infer<TSchema>) => string;
}

/**
 * Identity helper that pins TSchema, so `example` and `serialize` are checked
 * against the schema at the definition site.
 */
export function defineQrType<TSchema extends ZodType>(
  definition: QrTypeDefinition<TSchema>,
): QrTypeDefinition<TSchema> {
  return definition;
}
