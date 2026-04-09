export interface Supplier {
   id: string
   counterpartiesId: string
   siteUrl: { String: string; Valid: boolean } | null
   siteLogin: { String: string; Valid: boolean } | null
   sitePassword: { String: string; Valid: boolean } | null
}
