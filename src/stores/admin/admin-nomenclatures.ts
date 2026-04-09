// import { getNomenclatures } from '@/services/nomenclature'
// import { getProducts } from '@/services/product'
// import type { Nomenclature, Unit } from '@/types/nomenclature'
// import type { Product, ProductStatus } from '@/types/products'
// import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'

// export interface NomenclatureView extends Nomenclature {
//    purchasePrice: number
//    wholesalePrice: number
//    retailPrice: number
//    status: ProductStatus
// }

// export const useAdminNomenclatureStore = defineStore(
//    'admin-nomenclature',
//    () => {
//       const nomenclatures = ref<Nomenclature[]>([])
//       const products = ref<Product[]>([])
//       const units = ref<Unit[]>([])
//       const isLoading = ref(false)
//       const error = ref<string | null>(null)

//       const load = async (): Promise<void> => {
//          isLoading.value = true
//          error.value = null
//          try {
//             products.value = await getProducts()
//             nomenclatures.value = await getNomenclatures()
//          } catch {
//             error.value = 'Не удалось загрузить номенклатуру'
//          } finally {
//             isLoading.value = false
//          }
//       }

//       function getUnit(id: string) {
//          return units.value.find((u) => u.id === id) ?? null
//       }

//       const itemsView = computed<NomenclatureView[]>(() => {
//          console.log(products.value)

//          return products.value.flatMap((p) => {
//             const n = nomenclatures.value.find((n) => n.id === p.nomenclatureId)
//             if (!n) return []
//             return [
//                {
//                   ...n,
//                   purchasePrice: p.purchasePrice,
//                   wholesalePrice: p.wholesalePrice,
//                   retailPrice: p.retailPrice,
//                   status: p.status,
//                },
//             ]
//          })
//       })

//       function add() {}

//       function update() {}

//       function remove(id: string) {}

//       return {
//          products,
//          nomenclatures,
//          units,
//          isLoading,
//          error,
//          itemsView,
//          load,
//          getUnit,
//          add,
//          update,
//          remove,
//       }
//    }
// )
