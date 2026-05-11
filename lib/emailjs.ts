// ============================================================
// EMAILJS INTEGRATION
// ============================================================
import emailjs from "@emailjs/browser";

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(
  formData: ContactFormData
): Promise<{ success: boolean; message: string }> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS env vars not configured");
    return {
      success: false,
      message:
        "Email service not configured. Please add EMAILJS environment variables.",
    };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || "Portfolio Contact",
        message: formData.message,
        to_name: "Ashwani",
      },
      publicKey
    );
    return { success: true, message: "Message sent successfully! I'll reply soon." };
  } catch (error) {
    console.error("EmailJS error:", error);
    return {
      success: false,
      message: "Failed to send message. Please try emailing directly.",
    };
  }
}
