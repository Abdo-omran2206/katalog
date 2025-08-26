
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tdsaxesjwrjtcxznbnda.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkc2F4ZXNqd3JqdGN4em5ibmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNDg5ODksImV4cCI6MjA3MTYyNDk4OX0'

export const supabase = createClient(supabaseUrl, supabaseKey)