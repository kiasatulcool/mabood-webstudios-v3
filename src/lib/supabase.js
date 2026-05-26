import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://snlfrwgxassqdvukrwxf.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_wNuivMcel-jEJgiDRWcREg_oRn5iQTF'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const ADMIN_EMAIL = 'kiasatulmabood@gmail.com'
