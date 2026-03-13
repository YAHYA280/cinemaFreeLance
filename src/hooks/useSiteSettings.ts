'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface SiteSettings {
  phone: string;
  email: string;
  address_ar: string;
  address_fr: string;
  hours_ar: string;
  hours_fr: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  twitter_url: string;
  map_url: string;
}

const defaultSettings: SiteSettings = {
  phone: '+212 6XX XXX XXX',
  email: 'contact@alkarama.ma',
  address_ar: 'دار الشباب سيدي البرنوصي، الدار البيضاء، المغرب',
  address_fr: 'Maison des Jeunes Sidi Bernoussi, Casablanca, Maroc',
  hours_ar: 'الإثنين - السبت: 09:00 - 18:00',
  hours_fr: 'Lundi - Samedi: 09h00 - 18h00',
  facebook_url: '#',
  instagram_url: '#',
  youtube_url: '#',
  twitter_url: '#',
  map_url: '',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) {
        console.error('Error fetching site settings:', error);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const merged = { ...defaultSettings };
        for (const row of data) {
          if (row.key in merged) {
            (merged as Record<string, string>)[row.key] = row.value;
          }
        }
        setSettings(merged);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  return { settings, loading, defaultSettings };
}
