import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell me your name."),
  email: z.string().trim().email("That email doesn't look right."),
  message: z.string().trim().min(12, "A little more detail helps."),
  /** Honeypot — real people never see this field. */
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "h-12 rounded-[4px] border-line bg-transparent px-4 text-ink placeholder:text-ink-muted focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0";

export function ContactForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website) {
      // silently drop bot submissions
      reset();
      return;
    }

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (response.ok && data.success) {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out — I'll get back to you soon.",
        });
        reset();
        return;
      }

      toast({
        title: "Message not sent",
        description: data.error ?? "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Message not sent",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isSubmitting}
      className="relative rounded-[6px] border border-line bg-surface p-6 md:p-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="display text-xl text-ink">Send a message</h3>
        <span className="mono-label text-ink-muted">
          {isSubmitting ? "Sending" : "Reply within a day"}
        </span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <Label
            htmlFor="contact-name"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted"
          >
            Name
          </Label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn("mt-3", fieldClass)}
            {...register("name")}
          />
          {errors.name && (
            <p
              id="contact-name-error"
              className="mt-2 font-mono text-[0.6875rem] tracking-[0.06em] text-destructive"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="contact-email"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted"
          >
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn("mt-3", fieldClass)}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              className="mt-2 font-mono text-[0.6875rem] tracking-[0.06em] text-destructive"
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Label
          htmlFor="contact-message"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted"
        >
          Message
        </Label>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="What are you building?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(
            "mt-3 min-h-[140px] resize-y rounded-[4px] border-line bg-transparent px-4 py-3 text-ink placeholder:text-ink-muted focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          {...register("message")}
        />
        {errors.message && (
          <p
            id="contact-message-error"
            className="mt-2 font-mono text-[0.6875rem] tracking-[0.06em] text-destructive"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* honeypot */}
      <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
        <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-ink-muted">
          Or email directly — the address is on the left.
        </p>
      </div>
    </form>
  );
}
