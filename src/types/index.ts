import { Database } from './supabase'

type DbItem = Database['public']['Tables']['item']['Row']

export type PrimaryItem = DbItem
