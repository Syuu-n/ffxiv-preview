export interface Item {
  id: number
  name: string
  name_en: string
  level: number
  item_level: number
  jobs: string
  jobs_en: string
  patch: string
  is_untradable: boolean
  category: Category
  source: string
  source_en: string
}

export interface Category {
  id: number
  name: string
  name_en: string
}