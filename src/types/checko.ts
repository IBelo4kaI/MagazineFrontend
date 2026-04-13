import type { st } from 'vue-router/dist/index-DFCq6eJK.js'

export interface CheckoCodeName {
   Код: string
   Наим: string
}

export interface CheckoOkved extends CheckoCodeName {
   Версия: string
}

export interface CheckoLegalAddress {
   НасПункт: string | null
   АдресРФ: string | null
   ИдГАР: string | null
   Недост: boolean | null
}

export interface CheckoTaxInfo {
   ОсобРежим: string[] | null
}

export interface CheckoCompanyData {
   ОГРН: string | null
   ИНН: string | null
   КПП: string | null
   ОКПО: string | null
   ДатаРег: string | null
   НаимСокр: string | null
   НаимПолн: string | null
   ЮрАдрес: CheckoLegalAddress | null
   ОКВЭД: CheckoOkved | null
   ОКОПФ: CheckoCodeName | null
   ОКФС: CheckoCodeName | null
   ОКОГУ: CheckoCodeName | null
   ОКАТО: CheckoCodeName | null
   ОКТМО: CheckoCodeName | null
   Налоги: CheckoTaxInfo | null
   Руковод: {
      ФИО: string
      ИНН: string
      НаимДолжн: string
      ВидДолжн: string
   }[]
}

export interface CheckoMeta {
   status: 'ok' | 'error'
   today_request_count: number
   balance: number
   message?: string
}

export interface CheckoCompanyResponse {
   data: CheckoCompanyData
   meta: CheckoMeta
}

export interface CheckoEntrepreneurData {
   ОГРНИП: string | null
   ИНН: string | null
   ОКПО: string | null
   ДатаРег: string | null
   ДатаОГРНИП: string | null
   ФИО: string | null
   Тип: string | null
   ТипСокр: string | null
   ОКВЭД: CheckoOkved | null
   ОКОПФ: CheckoCodeName | null
   ОКФС: CheckoCodeName | null
   ОКОГУ: CheckoCodeName | null
   ОКАТО: CheckoCodeName | null
   ОКТМО: CheckoCodeName | null
   Налоги: CheckoTaxInfo | null
}

export interface CheckoEntrepreneurResponse {
   data: CheckoEntrepreneurData
   meta: CheckoMeta
}

export interface CheckoPersonData {
   ИНН: string | null
   ФИО: string | null
}

export interface CheckoPersonResponse {
   data: CheckoPersonData
   meta: CheckoMeta
}
