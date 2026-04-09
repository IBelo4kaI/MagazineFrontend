import type { Nomenclature } from '@/types/nomenclature'
import type { Unit } from '@/types/unit'
import type { WarehouseCategory } from '@/types/warehouseCategory'

export const mockNomenclatures: Nomenclature[] = [
   {
      id: 'dc6c9b91-df17-4468-a3dc-964b7d91af26',
      name: 'Утеплитель Юматекс Термо WAS 120 (150х600х1200)',
      description: null,
      article: null,
      unit_id: '95d86089-12d4-11f1-aa8c-bc241127d0bd',
      warehouse_category_id: '7d2d5aab-e354-4847-9683-67ffb4000204',
      unit: { id: '95d86089-12d4-11f1-aa8c-bc241127d0bd', name: 'шт' },
      warehouse_category: {
         id: '7d2d5aab-e354-4847-9683-67ffb4000204',
         name: 'Утеплитель',
         parent_id: null,
      },
      length: null,
      width: null,
      height: null,
      weight: null,
      created_at: '2026-04-03T13:55:26',
      created_by: '6e0cc0d3-7088-40c6-a071-0b4c28b190df',
   },
   {
      id: '1ea07d2d-fe7e-4018-bfad-e9342cb93749',
      name: 'Гайковерт',
      description: 'Мощна, сильна, надежна',
      article: 'GK921',
      unit_id: '95d86089-12d4-11f1-aa8c-bc241127d0bd',
      warehouse_category_id: '27bcf122-14df-48c1-8cc9-02ff3667c5ec',
      unit: { id: '95d86089-12d4-11f1-aa8c-bc241127d0bd', name: 'шт' },
      warehouse_category: {
         id: '27bcf122-14df-48c1-8cc9-02ff3667c5ec',
         name: 'Инструменты',
         parent_id: null,
      },
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      created_at: '2026-03-18T05:49:11',
      created_by: '9768155a-b96c-42cb-8e74-a22d523b4a17',
   },
   {
      id: '0de89b24-72cd-4736-a602-e8cfe0da38cf',
      name: 'Молоток',
      description: null,
      article: null,
      unit_id: '95d86089-12d4-11f1-aa8c-bc241127d0bd',
      warehouse_category_id: '27bcf122-14df-48c1-8cc9-02ff3667c5ec',
      unit: { id: '95d86089-12d4-11f1-aa8c-bc241127d0bd', name: 'шт' },
      warehouse_category: {
         id: '27bcf122-14df-48c1-8cc9-02ff3667c5ec',
         name: 'Инструменты',
         parent_id: null,
      },
      length: null,
      width: null,
      height: null,
      weight: null,
      created_at: '2026-03-05T18:00:43',
      created_by: '122d844d-b3be-42d9-8b5b-8a0058edb2d8',
   },
   {
      id: '1fa56da1-12df-11f1-aa8c-bc241127d0bd',
      name: 'Гвоздь 100 мм',
      description: null,
      article: null,
      unit_id: '95d86089-12d4-11f1-aa8c-bc241127d0bd',
      warehouse_category_id: '6d7f283c-12d4-11f1-aa8c-bc241127d0bd',
      unit: { id: '95d86089-12d4-11f1-aa8c-bc241127d0bd', name: 'шт' },
      warehouse_category: {
         id: '6d7f283c-12d4-11f1-aa8c-bc241127d0bd',
         name: 'Гвозди',
         parent_id: 'e73bfbe7-12d3-11f1-aa8c-bc241127d0bd',
      },
      length: null,
      width: null,
      height: null,
      weight: null,
      created_at: '2026-02-26T09:53:36',
      created_by: '122d844d-b3be-42d9-8b5b-8a0058edb2d8',
   },
]

export const mockUnits: Unit[] = [
   {
      id: '95d86089-12d4-11f1-aa8c-bc241127d0bd',
      name: 'шт',
   },
]

export const mockWarehouseCategories: WarehouseCategory[] = [
   {
      id: 'e73bfbe7-12d3-11f1-aa8c-bc241127d0bd',
      name: 'Крепёж',
      parent_id: null,
   },
   {
      id: '6d7f283c-12d4-11f1-aa8c-bc241127d0bd',
      name: 'Гвозди',
      parent_id: 'e73bfbe7-12d3-11f1-aa8c-bc241127d0bd',
   },
   {
      id: '27bcf122-14df-48c1-8cc9-02ff3667c5ec',
      name: 'Инструменты',
      parent_id: null,
   },
   {
      id: '7d2d5aab-e354-4847-9683-67ffb4000204',
      name: 'Утеплитель',
      parent_id: null,
   },
]
