export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]
export type JSON = { [key: string]: string }
export type OptionValues = JSON[]

export interface Database {
  public: {
    Tables: {
      answer: {
        Row: {
          answer: string | null
          answerTitle: string | null
          created_at: string | null
          description: string | null
          id: number
          itemKey: string | null
          optionKey: string | null
          optionTitle: string | null
          score: number | null
          title: string | null
        }
        Insert: {
          answer?: string | null
          answerTitle?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          itemKey?: string | null
          optionKey?: string | null
          optionTitle?: string | null
          score?: number | null
          title?: string | null
        }
        Update: {
          answer?: string | null
          answerTitle?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          itemKey?: string | null
          optionKey?: string | null
          optionTitle?: string | null
          score?: number | null
          title?: string | null
        }
        Relationships: []
      }
      item: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          itemKey: string | null
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
          itemKey?: string | null
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
          itemKey?: string | null
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
          values: OptionValues | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          item_id?: number | null
          key?: string | null
          title?: string | null
          type?: string | null
          values?: OptionValues | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          item_id?: number | null
          key?: string | null
          title?: string | null
          type?: string | null
          values?: OptionValues | null
        }
      }
      result: {
        Row: {
          id: number
          json: string | null
          result: string | null
          uuid: string | null
        }
        Insert: {
          id?: number
          json?: string | null
          result?: string | null
          uuid?: string | null
        }
        Update: {
          id?: number
          json?: string | null
          result?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string | null
          id: number
          nickname: string | null
          userId: string | null
          uuid: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          nickname?: string | null
          userId?: string | null
          uuid?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          nickname?: string | null
          uuid?: string | null
          userId?: string | null
        }
        Relationships: []
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
