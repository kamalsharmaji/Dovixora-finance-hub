import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { FormSuccessState } from "@/components/ui/form-success-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GetApiKeyFormProps {
  heading?: string;
  description?: string;
}

function GetApiKeyForm({
  heading = "Build with us",
  description = "We'd love to show you how DOVIXORA can help your business. Fill out the form and we'll be in touch within 24 hours.",
}: GetApiKeyFormProps) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", company: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormSuccessState
        title="Thanks — we'll be in touch"
        description="Our team typically responds within 24 hours with your API key and next steps."
      />
    );
  }

  return (
    <>
      <h3 className="font-display text-xl font-bold text-foreground">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="apikey-name">Your Name</Label>
            <Input
              id="apikey-name"
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="apikey-email">Your Email</Label>
            <Input
              id="apikey-email"
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="apikey-mobile">Mobile Number</Label>
            <Input
              id="apikey-mobile"
              type="tel"
              required
              value={form.mobile}
              onChange={(event) => setForm((prev) => ({ ...prev, mobile: event.target.value }))}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="apikey-company">Your Company</Label>
            <Input
              id="apikey-company"
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="apikey-interest">Which APIs are you interested in?</Label>
          <Textarea
            id="apikey-interest"
            rows={3}
            placeholder="e.g. Aadhaar Verification, PAN Verification"
            value={form.interest}
            onChange={(event) => setForm((prev) => ({ ...prev, interest: event.target.value }))}
          />
        </div>
        <Button type="submit" className="w-full">
          Send
        </Button>
      </form>
      <p className="mt-5 text-xs text-muted-foreground">
        For all updates &amp; much more, mail on{" "}
        <a href="mailto:contact@dovixora.com" className="font-medium text-yellow-deep hover:underline">
          contact@dovixora.com
        </a>
      </p>
      <p className="mt-1 text-xs text-muted-foreground/70">We respect your privacy.</p>
    </>
  );
}

export { GetApiKeyForm };
