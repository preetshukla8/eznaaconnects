type ApiSuccessResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
  id?: string;
  referenceId?: string;
  grievanceId?: string;
  grievance?: unknown;
  [key: string]: unknown;
};

function getPayloadId(payload: ApiSuccessResponse) {
  return (
    payload.id ||
    payload.referenceId ||
    payload.grievanceId ||
    (payload.data as { id?: string; referenceId?: string; grievanceId?: string } | undefined)?.id ||
    (payload.data as { id?: string; referenceId?: string; grievanceId?: string } | undefined)?.referenceId ||
    (payload.data as { id?: string; referenceId?: string; grievanceId?: string } | undefined)?.grievanceId ||
    ""
  );
}

type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  [key: string]: unknown;
};

const GAS_API_URL = [
  import.meta.env.VITE_GAS_API_URL,
  typeof process !== "undefined" ? process.env.VITE_GAS_API_URL : undefined,
]
  .find((value): value is string => typeof value === "string" && value.trim().length > 0)
  ?.trim();

function getErrorMessage(payload: ApiErrorResponse | null | undefined, fallback: string) {
  return payload?.message || payload?.error || fallback;
}

async function postToGas(payload: Record<string, unknown>): Promise<ApiSuccessResponse> {
  if (!GAS_API_URL) {
    throw new Error("Backend URL is not configured.");
  }
  console.log("Calling GAS API:", GAS_API_URL, payload);

  const response = await fetch(GAS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let parsed: ApiErrorResponse | null = null;

  if (text) {
    try {
      parsed = JSON.parse(text) as ApiErrorResponse;
    } catch {
      parsed = { message: text };
    }
  }

  if (!response.ok || parsed?.success === false) {
    throw new Error(getErrorMessage(parsed, `Request failed with status ${response.status}.`));
  }

  return parsed ?? { success: true, message: "Request completed successfully." };
}

async function postWithFallback(action: string, payloads: Record<string, unknown>[]): Promise<ApiSuccessResponse> {
  let lastError: Error | null = null;

  for (const payload of payloads) {
    try {
      return await postToGas({ action, ...payload });
    } catch (error) {
      lastError = error as Error;
    }
  }

  throw lastError ?? new Error("The request could not be completed.");
}

function splitPhone(combined: string): { countryCode: string; phone: string } {
  const trimmed = combined.trim();
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) {
    return { countryCode: "", phone: trimmed };
  }
  return {
    countryCode: trimmed.slice(0, spaceIndex),
    phone: trimmed.slice(spaceIndex + 1),
  };
}

export async function submitConsultation(payload: {
  name: string;
  email: string;
  phone: string;
  altPhone?: string;
  service?: string;
  notes?: string;
}) {
  const { countryCode, phone } = splitPhone(payload.phone);

  return postToGas({
    action: "consultation",
    fullName: payload.name,
    email: payload.email,
    phone,
    countryCode,
    service: payload.service,
    message: payload.notes,
    // Ask the backend to dispatch a branded welcome/acknowledgement email.
    sendWelcomeEmail: true,
    welcomeEmail: {
      subject: "Welcome to Eznaa Connect — we've received your request",
      brand: "Eznaa Connect Business Consultancy Services",
      preheader: "Thanks for reaching out. A senior advisor will be in touch shortly.",
      body: `Hello ${payload.name},\n\nThank you for reaching out to Eznaa Connect Business Consultancy Services — a unit of Eznaa Global Mart FZ-LLC. We have successfully received your consultation request${payload.service ? ` regarding ${payload.service}` : ""}.\n\nA senior advisor will contact you within our standard response window (24 business hours).\n\nWarm regards,\nTeam Eznaa Connect`,
    },
  });
}

export async function submitGrievance(payload: {
  subject: string;
  category: string;
  description: string;
  contactPhone?: string;
  name?: string;
  email?: string;
}) {
  const { countryCode, phone } = splitPhone(payload.contactPhone ?? "");

  return postToGas({
    action: "grievance",
    subject: payload.subject,
    category: payload.category,
    description: payload.description,
    contactNumber: phone,
    countryCode,
    name: payload.name,
    email: payload.email,
  });
}

export async function trackGrievance(grievanceId: string): Promise<ApiSuccessResponse> {
  if (!GAS_API_URL) {
    throw new Error("Backend URL is not configured.");
  }

  const url = `${GAS_API_URL}?action=track&grievanceId=${encodeURIComponent(grievanceId.trim())}`;

 const response = await fetch(url, {
  method: "GET",
  cache: "no-store",
});

  const text = await response.text();
  let parsed: ApiErrorResponse | null = null;

  if (text) {
    try {
      parsed = JSON.parse(text) as ApiErrorResponse;
    } catch {
      parsed = { message: text };
    }
  }

  if (!response.ok || parsed?.success === false) {
    throw new Error(getErrorMessage(parsed, `Request failed with status ${response.status}.`));
  }

  return parsed ?? { success: true, message: "Grievance found." };
}

export { getPayloadId };
