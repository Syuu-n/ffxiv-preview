export interface ItemIndex {
  items: Item[]
  meta: Meta
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
  model_main_1: number
  model_main_2: number
}

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
  model_main_1: number
  model_main_2: number
  model_main_3: number
  model_main_4: number
  source_array: string[][]
  source_array_en: string[][]
  variations?: Item[]
  uniq_variations?: Item[]
  series?: Item[]
}

export interface Meta {
  current_page: number
  next_page: number
  prev_page: number
  total_pages: number
  total_count: number
}

export interface Category {
  name: string
  name_en: string
}