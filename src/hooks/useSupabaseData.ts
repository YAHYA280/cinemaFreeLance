'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useSupabaseData<T>(
  table: string,
  orderBy: string = 'display_order',
  filter?: { column: string; value: unknown }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient();
      let query = supabase.from(table).select('*').order(orderBy, { ascending: true });
      if (filter) {
        query = query.eq(filter.column, filter.value);
      }
      const { data: result, error } = await query;
      if (error) console.error(`Error fetching ${table}:`, error);
      setData((result as T[]) || []);
      setLoading(false);
    };
    fetch();
  }, [table, orderBy, filter?.column, filter?.value]);

  return { data, loading };
}
