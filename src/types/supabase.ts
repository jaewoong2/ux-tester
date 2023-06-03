export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

type JSON = { [key: string]: string }

export interface Database {
  public: {
    Tables: {
      item: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          key: string | null
          optionValue: JSON | null
          placeholder: string | null
          thumbnail: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          key?: string | null
          optionValue?: JSON | null
          placeholder?: string | null
          thumbnail?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          key?: string | null
          optionValue?: JSON | null
          placeholder?: string | null
          thumbnail?: string | null
          title?: string | null
          type?: string | null
        }
      }
      option: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          item_id: number | null
          key: string | null
          title: string | null
          type: string | null
          values: JSON | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          item_id?: number | null
          key?: string | null
          title?: string | null
          type?: string | null
          values?: JSON | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          item_id?: number | null
          key?: string | null
          title?: string | null
          type?: string | null
          values?: JSON | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
