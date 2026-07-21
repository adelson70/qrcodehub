import type { ReactNode } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { Select, Textarea, TextInput } from '@/components/ui/input';

/**
 * One hand-written form per QR type.
 *
 * Deliberately not generated from the Zod schemas. Schema-driven form
 * generation would save a few hundred lines and cost the thing that matters:
 * WiFi wants an encryption picker and a hidden-network checkbox, vCard wants
 * name fields side by side, WhatsApp needs a country-code warning. Generated
 * forms look generated. The schema and serializer are still shared, which is
 * where the real leverage is.
 */

export interface FormProps {
  readonly values: Record<string, unknown>;
  readonly setField: (name: string, value: unknown) => void;
  readonly errors: Record<string, string>;
}

/**
 * Every control carries `name` matching its state key.
 *
 * Not decoration: it is what lets TypeStudio read the form back out of the DOM
 * after hydration and recover anything typed before React took over. It also
 * gives the browser a sensible autofill grouping for free.
 */

const str = (values: Record<string, unknown>, key: string): string =>
  typeof values[key] === 'string' ? (values[key] as string) : '';

const bool = (values: Record<string, unknown>, key: string): boolean =>
  values[key] === true;

function WifiForm({ values, setField, errors }: FormProps) {
  const openNetwork = str(values, 'encryption') === 'nopass';

  return (
    <>
      <Field label="Network name (SSID)" error={errors.ssid}>
        <TextInput
          name="ssid"
          value={str(values, 'ssid')}
          onChange={(event) => setField('ssid', event.target.value)}
          placeholder="My Network"
          autoComplete="off"
          spellCheck={false}
          data-testid="field-ssid"
        />
      </Field>

      <Field label="Security">
        <Select
          name="encryption"
          value={str(values, 'encryption')}
          onChange={(event) => setField('encryption', event.target.value)}
          options={[
            // No separate WPA2/WPA3: the format cannot distinguish them and
            // devices negotiate the protocol themselves. Offering the choice
            // would be a UI lie.
            { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
            { value: 'WEP', label: 'WEP (legacy)' },
            { value: 'nopass', label: 'Open — no password' },
          ]}
        />
      </Field>

      <Field
        label="Password"
        error={errors.password}
        help={
          openNetwork
            ? 'Not needed for an open network.'
            : 'Typed here and encoded locally. It is never uploaded.'
        }
      >
        <TextInput
          type="text"
          name="password"
          value={str(values, 'password')}
          onChange={(event) => setField('password', event.target.value)}
          disabled={openNetwork}
          // Not type="password": the whole point is to check it before printing
          // it on a wall, and browsers offer to save credentials from a masked
          // field, which is the last thing this page should trigger.
          autoComplete="off"
          spellCheck={false}
          data-testid="field-password"
        />
      </Field>

      <Checkbox
        label="Hidden network"
        help="Tick only if the network does not broadcast its name."
        name="hidden"
        checked={bool(values, 'hidden')}
        onChange={(event) => setField('hidden', event.target.checked)}
      />
    </>
  );
}

function VCardForm({ values, setField, errors }: FormProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" error={errors.firstName}>
          <TextInput
            name="firstName"
            value={str(values, 'firstName')}
            onChange={(event) => setField('firstName', event.target.value)}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last name" error={errors.lastName}>
          <TextInput
            name="lastName"
            value={str(values, 'lastName')}
            onChange={(event) => setField('lastName', event.target.value)}
            autoComplete="family-name"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Organisation" error={errors.organization}>
          <TextInput
            name="organization"
            value={str(values, 'organization')}
            onChange={(event) => setField('organization', event.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label="Job title" error={errors.jobTitle}>
          <TextInput
            name="jobTitle"
            value={str(values, 'jobTitle')}
            onChange={(event) => setField('jobTitle', event.target.value)}
            autoComplete="organization-title"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone}>
          <TextInput
            type="tel"
            name="phone"
            value={str(values, 'phone')}
            onChange={(event) => setField('phone', event.target.value)}
            autoComplete="tel"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <TextInput
            type="email"
            name="email"
            value={str(values, 'email')}
            onChange={(event) => setField('email', event.target.value)}
            autoComplete="email"
          />
        </Field>
      </div>

      <Field label="Website" error={errors.website}>
        <TextInput
          type="url"
          name="website"
          value={str(values, 'website')}
          onChange={(event) => setField('website', event.target.value)}
          placeholder="https://example.com"
        />
      </Field>

      <Field label="Address" error={errors.address}>
        <TextInput
          name="address"
          value={str(values, 'address')}
          onChange={(event) => setField('address', event.target.value)}
          autoComplete="street-address"
        />
      </Field>

      <Field label="Note" error={errors.note}>
        <Textarea
          name="note"
          value={str(values, 'note')}
          onChange={(event) => setField('note', event.target.value)}
          rows={2}
        />
      </Field>
    </>
  );
}

function WhatsAppForm({ values, setField, errors }: FormProps) {
  return (
    <>
      <Field
        label="WhatsApp number"
        error={errors.phone}
        // The single most common way this type is built wrong: wa.me returns an
        // error page rather than a chat when the country code is missing.
        help="Include the country code, e.g. +55 11 99999 9999."
      >
        <TextInput
          type="tel"
          name="phone"
          value={str(values, 'phone')}
          onChange={(event) => setField('phone', event.target.value)}
          placeholder="+55 11 99999 9999"
        />
      </Field>

      <Field
        label="Message"
        error={errors.message}
        help="Optional. Appears already typed in the chat, ready to send."
      >
        <Textarea
          name="message"
          value={str(values, 'message')}
          onChange={(event) => setField('message', event.target.value)}
        />
      </Field>
    </>
  );
}

function EmailForm({ values, setField, errors }: FormProps) {
  return (
    <>
      <Field label="Email address" error={errors.email}>
        <TextInput
          type="email"
          name="email"
          value={str(values, 'email')}
          onChange={(event) => setField('email', event.target.value)}
          placeholder="hello@example.com"
          autoComplete="email"
        />
      </Field>

      <Field label="Subject" error={errors.subject}>
        <TextInput
          name="subject"
          value={str(values, 'subject')}
          onChange={(event) => setField('subject', event.target.value)}
        />
      </Field>

      <Field label="Message" error={errors.body}>
        <Textarea
          name="body"
          value={str(values, 'body')}
          onChange={(event) => setField('body', event.target.value)}
        />
      </Field>
    </>
  );
}

function PhoneForm({ values, setField, errors }: FormProps) {
  return (
    <Field
      label="Phone number"
      error={errors.phone}
      help="Include the country code so it dials correctly from anywhere."
    >
      <TextInput
        type="tel"
        name="phone"
        value={str(values, 'phone')}
        onChange={(event) => setField('phone', event.target.value)}
        placeholder="+1 555 0100"
        autoComplete="tel"
      />
    </Field>
  );
}

function SmsForm({ values, setField, errors }: FormProps) {
  return (
    <>
      <Field label="Phone number" error={errors.phone}>
        <TextInput
          type="tel"
          name="phone"
          value={str(values, 'phone')}
          onChange={(event) => setField('phone', event.target.value)}
          placeholder="+1 555 0100"
          autoComplete="tel"
        />
      </Field>

      <Field label="Message" error={errors.message} help="Optional.">
        <Textarea
          name="message"
          value={str(values, 'message')}
          onChange={(event) => setField('message', event.target.value)}
        />
      </Field>
    </>
  );
}

function UrlForm({ values, setField, errors }: FormProps) {
  return (
    <Field
      label="Link"
      error={errors.url}
      help="No need to type https:// — we add it if it is missing."
    >
      <TextInput
        name="url"
        value={str(values, 'url')}
        onChange={(event) => setField('url', event.target.value)}
        placeholder="qrhub.app"
        autoComplete="off"
        spellCheck={false}
      />
    </Field>
  );
}

function TextForm({ values, setField, errors }: FormProps) {
  return (
    <Field
      label="Text"
      error={errors.text}
      help="Encoded exactly as typed, including spacing."
    >
      <Textarea
        name="text"
        value={str(values, 'text')}
        onChange={(event) => setField('text', event.target.value)}
        rows={4}
      />
    </Field>
  );
}

export const FORMS: Record<string, (props: FormProps) => ReactNode> = {
  wifi: WifiForm,
  vcard: VCardForm,
  whatsapp: WhatsAppForm,
  email: EmailForm,
  phone: PhoneForm,
  sms: SmsForm,
  url: UrlForm,
  text: TextForm,
};
