import { useState } from "react";
import { personalInfo } from "../data/siteData";
import Button from "./Button";
import "./Contact.css";

const SUBJECT_OPTIONS = [
  "New Business Website",
  "Website Redesign",
  "Landing Page Development",
  "Web Application",
  "Website Maintenance & Support",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  subject: "New Business Website",
  customSubject: "",
  channel: "whatsapp",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const whatsappDigits = personalInfo.whatsapp.replace(/\D/g, "");
  const isWhatsappClickable = whatsappDigits.length >= 8;
  const whatsappHref = isWhatsappClickable
    ? `https://wa.me/${whatsappDigits}`
    : null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (form.subject === "Other" && !form.customSubject.trim()) {
      next.customSubject = "Please specify your subject.";
    }
    if (!form.message.trim()) next.message = "Message is required.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleChannelSelect = (channel) => {
    setForm((prev) => ({ ...prev, channel }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalSubject =
      form.subject === "Other"
        ? form.customSubject.trim() || "Website Project Inquiry"
        : form.subject;

    if (form.channel === "whatsapp") {
      const waText = `Hello ${personalInfo.name},\n\nI am contacting you from your portfolio website.\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Subject:* ${finalSubject}\n\n*Message:*\n${form.message}`;
      const waUrl = `https://wa.me/${whatsappDigits}'ext=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else {
      const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        finalSubject
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${finalSubject}\n\n${form.message}`
      )}`;
      window.location.href = mailto;
    }

    setSubmitted(true);
    setForm((prev) => ({
      ...initialForm,
      channel: prev.channel,
    }));
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <div className="contact__intro">
          <h2 className="section-title">Let's work together</h2>
          <p className="contact__lead">
            Have a project in mind or want to discuss how a website could help
            your business? Get in touch. I'd be glad to hear from you.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__label">Email</span>
              <div className="contact__email-row">
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="contact__copy-btn"
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </li>
            <li>
              <span className="contact__label">WhatsApp</span>
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  {personalInfo.whatsapp}
                </a>
              ) : (
                <span>{personalInfo.whatsapp}</span>
              )}
            </li>
            <li>
              <span className="contact__label">LinkedIn</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Profile
              </a>
            </li>
            <li>
              <span className="contact__label">GitHub</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {submitted && (
            <div className="contact__success" role="status">
              <p>
                {form.channel === "whatsapp"
                  ? "Your message was prepared and opened in WhatsApp! If it didn't open automatically, you can reach out directly:"
                  : "Your email client should open with your message prepared. If it didn't open automatically, you can email me directly:"}
              </p>
              <div className="contact__success-actions">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="contact__success-email"
                >
                  {personalInfo.email}
                </a>
                <button
                  type="button"
                  className="btn btn-secondary contact__copy-btn-sm"
                  onClick={handleCopyEmail}
                >
                  {copied ? "Copied to clipboard!" : "Copy email address"}
                </button>
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Send Message Via</label>
            <div
              className="contact__channel-toggle"
              role="radiogroup"
              aria-label="Preferred messaging platform"
            >
              <button
                type="button"
                role="radio"
                aria-checked={form.channel === "whatsapp"}
                className={`channel-btn ${
                  form.channel === "whatsapp" ? "channel-btn--active" : ""
                }`}
                onClick={() => handleChannelSelect("whatsapp")}
              >
                <svg
                  className="channel-btn__icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp</span>

              </button>

              <button
                type="button"
                role="radio"
                aria-checked={form.channel === "email"}
                className={`channel-btn ${
                  form.channel === "email" ? "channel-btn--active" : ""
                }`}
                onClick={() => handleChannelSelect("email")}
              >
                <svg
                  className="channel-btn__icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Email</span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="form-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="form-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <div className="select-wrapper">
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="form-select"
              >
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {form.subject === "Other" && (
            <div className="form-group form-group--reveal">
              <label htmlFor="customSubject">Specify Subject</label>
              <input
                id="customSubject"
                name="customSubject"
                type="text"
                placeholder="e.g. Portfolio Redesign & Interactive 3D"
                value={form.customSubject}
                onChange={handleChange}
                aria-invalid={!!errors.customSubject}
                aria-describedby={
                  errors.customSubject ? "customSubject-error" : undefined
                }
                autoFocus
              />
              {errors.customSubject && (
                <p id="customSubject-error" className="form-error" role="alert">
                  {errors.customSubject}
                </p>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe your project, timeline, or requirements..."
              value={form.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="form-error" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="contact__submit"
          >
            {form.channel === "whatsapp" ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Send via WhatsApp</span>
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Send via Email</span>
              </>
            )}
          </Button>

          <p className="contact__note">
            {form.channel === "whatsapp"
              ? "Opens WhatsApp with your pre-formatted inquiry ready to send."
              : "Submitting opens your email client. No data is stored on this site."}
          </p>
        </form>
      </div>
    </section>
  );
}
