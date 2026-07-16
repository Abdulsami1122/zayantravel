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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const assertResponse = async (response: Response) => {
  const json = await response.json();
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
      });
      const json = await assertResponse(response);
      return json.data;
    } catch (error) {
      console.error("Error fetching site settings:", error);
      // Return default empty settings so the app doesn't crash if backend is down
      return {
        websiteTitle: "Zayan Travel Consultants",
        emailAddress: "",
        phoneNumber: "",
        address: "",
        logoUrl: "",
      };
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
    });
    const json = await assertResponse(response);
    return json.data;
  },
};
