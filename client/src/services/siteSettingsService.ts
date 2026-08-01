interface SocialLinks {
  facebook?: string;
  tiktok?: string;
  instagram?: string;
}

export interface SiteSettings {
  websiteTitle: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  logoUrl?: string;
  socialLinks?: SocialLinks;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") ||
  "http://localhost:5000";

const API_URL = `${API_BASE_URL}/api`;

const defaultSiteSettings: SiteSettings = {
  websiteTitle: "Zayan Travel and Tour Consultants",
  emailAddress: "",
  phoneNumber: "",
  address: "",
  logoUrl: "",
  socialLinks: {
    facebook: "",
    tiktok: "",
    instagram: "",
  },
};

const assertResponse = async (response: Response) => {
  const text = await response.text();
  const json = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(json?.message || "Failed to fetch site settings");
  }

  return json;
};

export const siteSettingsService = {
  async getSettings(): Promise<SiteSettings> {
    try {
      const response = await fetch(`${API_URL}/site-settings`, {
        cache: "no-store",
        credentials: "include",
      });
      const json = await assertResponse(response);
      return json.data;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Falling back to default site settings:", error);
      }

      return defaultSiteSettings;
    }
  },

  async updateSettings(settings: Partial<SiteSettings>, token: string): Promise<SiteSettings> {
    const response = await fetch(`${API_URL}/site-settings`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
      credentials: "include",
    });
    const json = await assertResponse(response);
    return json.data;
  },

  async uploadLogo(file: File, token: string): Promise<SiteSettings> {
    const formData = new FormData();
    formData.append("logo", file);

    const response = await fetch(`${API_URL}/site-settings/logo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      credentials: "include",
    });
    const json = await assertResponse(response);
    return json.data;
  },
};
