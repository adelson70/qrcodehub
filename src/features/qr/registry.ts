import type { QrTypeDefinition } from './types/definition';
import { urlType } from './types/url';
import { textType } from './types/text';
import { wifiType } from './types/wifi';
import { whatsappType } from './types/whatsapp';
import { vcardType } from './types/vcard';
import { emailType } from './types/email';
import { phoneType } from './types/phone';
import { smsType } from './types/sms';

/**
 * The single source of truth for QR types.
 *
 * Navigation, the tool hub, the sitemap, related-type links and the type picker
 * are all derived from this array. Adding a type here wires up every one of
 * them; there is no second list to forget.
 *
 * Order is deliberate -- it is the order types appear in navigation and on the
 * hub, so the most-used types come first rather than alphabetically.
 */

/**
 * Each definition binds its own payload shape, so the array is heterogeneous.
 * Registry consumers only read metadata (id, label, route, icon, seo, related);
 * anything that touches payload data goes through `serializeForType`, which
 * performs the one narrowing cast in the codebase, in one auditable place.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQrType = QrTypeDefinition<any>;

export const qrTypes: readonly AnyQrType[] = [
  urlType,
  textType,
  wifiType,
  whatsappType,
  vcardType,
  emailType,
  phoneType,
  smsType,
];

const byId = new Map<string, AnyQrType>(qrTypes.map((type) => [type.id, type]));

export function getQrType(id: string): AnyQrType | undefined {
  return byId.get(id);
}

export function getRelatedTypes(id: string): readonly AnyQrType[] {
  const type = byId.get(id);
  if (!type) return [];
  return type.related.map((relatedId) => byId.get(relatedId)).filter((t): t is AnyQrType => Boolean(t));
}

export type SerializeOutcome =
  | { readonly ok: true; readonly text: string }
  | { readonly ok: false; readonly issues: readonly { path: string; message: string }[] };

/**
 * Validate raw input against a type's schema, then serialize it.
 *
 * This is the only place payload data crosses the heterogeneous-registry
 * boundary. Zod has already proven the value matches the schema by the time
 * `serialize` runs, so the cast is checked at runtime even though the compiler
 * cannot express it across the union.
 */
export function serializeForType(id: string, input: unknown): SerializeOutcome {
  const type = byId.get(id);
  if (!type) {
    return { ok: false, issues: [{ path: '', message: `Unknown QR type: ${id}` }] };
  }

  const parsed = type.schema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      // Annotated structurally rather than with Zod's own issue type: the
      // heterogeneous registry erases the schema's generics, and depending on
      // Zod's internal type names would break on every minor version.
      issues: parsed.error.issues.map(
        (issue: { readonly path: readonly PropertyKey[]; readonly message: string }) => ({
          path: issue.path.map(String).join('.'),
          message: issue.message,
        }),
      ),
    };
  }

  return { ok: true, text: type.serialize(parsed.data) };
}

export {
  urlType,
  textType,
  wifiType,
  whatsappType,
  vcardType,
  emailType,
  phoneType,
  smsType,
};
