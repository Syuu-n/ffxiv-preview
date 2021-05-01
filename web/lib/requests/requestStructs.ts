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
  lodestone_id: string
  model_main_1: number
  model_main_2: number
  model_main_3: number
  model_main_4: number
  source: string
  source_en: string
}

export interface Category {
  name: string
  name_en: string
}