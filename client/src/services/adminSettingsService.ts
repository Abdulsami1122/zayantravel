interface AdminSettings {
    websiteTitle: string;
    email: string;
    phone: string;
    address: string;
    siteLogo?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function handleJsonResponse(response: Response) {
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) {
        const message = data?.message || `Request failed with status ${response.status}`;
        throw new Error(message);
    }
    return data;
}

const defaultSettings: AdminSettings = {
    websiteTitle: "Wiser Consulting",
    email: "",
    phone: "",
    address: "",
    siteLogo: "",
    socialLinks: {},
};

export const adminSettingsService = {
    /**
     * Get public admin settings (no auth required)
     */
    async getPublicSettings(): Promise<AdminSettings> {
        try {
            const response = await fetch(`${API_URL}/admin-settings/public`);
            const data = await handleJsonResponse(response);
            return data?.data || defaultSettings;
        } catch (error) {
            console.error("Error fetching public settings:", error);
            return defaultSettings;
        }
    },

    /**
     * Get admin settings (requires authentication)
     */
    async getSettings(token: string): Promise<AdminSettings> {
        try {
            const response = await fetch(`${API_URL}/admin-settings`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await handleJsonResponse(response);
            return data.data;
        } catch (error) {
            console.error("Error fetching admin settings:", error);
            throw error;
        }
    },

    /**
     * Update admin settings
     */
    async updateSettings(
        settings: Partial<AdminSettings>,
        token: string
    ): Promise<AdminSettings> {
        try {
            const response = await fetch(`${API_URL}/admin-settings`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(settings),
            });
            const data = await handleJsonResponse(response);
            return data.data;
        } catch (error) {
            console.error("Error updating admin settings:", error);
            throw error;
        }
    },

    /**
     * Upload logo
     */
    async uploadLogo(file: File, token: string): Promise<AdminSettings> {
        try {
            const formData = new FormData();
            formData.append("logo", file);

            const response = await fetch(`${API_URL}/admin-settings/logo/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await handleJsonResponse(response);
            return data.data;
        } catch (error) {
            console.error("Error uploading logo:", error);
            throw error;
        }
    },

    /**
     * Delete logo
     */
    async deleteLogo(token: string): Promise<AdminSettings> {
        try {
            const response = await fetch(`${API_URL}/admin-settings/logo`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await handleJsonResponse(response);
            return data.data;
        } catch (error) {
            console.error("Error deleting logo:", error);
            throw error;
        }
    },
};
