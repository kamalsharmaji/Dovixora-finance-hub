import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { FormSuccessState } from "@/components/ui/form-success-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const topics = ["Sales", "Partnerships", "Support", "General enquiry"] as const;

interface FormState {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", topic: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Work email is required.";
    else if (!EMAIL_PATTERN.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.topic) nextErrors.topic = "Select a topic.";
    if (!form.message.trim()) nextErrors.message = "Tell us a little about your request.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <FormSuccessState
        title="Message sent."
        description="This is a frontend preview — no message was actually sent. Our team typically responds within one business day."
      />
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            value={form.name}
            onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
            aria-invalid={Boolean(errors.name)}
            className={errors.name ? "border-error focus-visible:ring-error" : undefined}
          />
          {errors.name && <p className="text-xs text-error">{errors.name}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contact-email">Work email</Label>
          <Input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
            aria-invalid={Boolean(errors.email)}
            className={errors.email ? "border-error focus-visible:ring-error" : undefined}
          />
          {errors.email && <p className="text-xs text-error">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="contact-company">Company</Label>
          <Input
            id="contact-company"
            value={form.company}
            onChange={(event) => setForm((f) => ({ ...f, company: event.target.value }))}
            placeholder="Optional"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contact-topic">Topic</Label>
          <Select value={form.topic} onValueChange={(value) => setForm((f) => ({ ...f, topic: value }))}>
            <SelectTrigger id="contact-topic" aria-invalid={Boolean(errors.topic)}>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.topic && <p className="text-xs text-error">{errors.topic}</p>}
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(event) => setForm((f) => ({ ...f, message: event.target.value }))}
          aria-invalid={Boolean(errors.message)}
          className={errors.message ? "border-error focus-visible:ring-error" : undefined}
        />
        {errors.message && <p className="text-xs text-error">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? <LoadingSpinner label="Sending…" /> : "Send Message"}
      </Button>
    </form>
  );
}

export { ContactForm };
