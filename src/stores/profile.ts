import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface PersonalProfile {
   id: 'personal'
   type: 'personal'
   name: string
   phone: string
   address: string
}

export interface LegalProfile {
   id: string
   type: 'legal'
   fullName: string
   inn: string
   kpp: string
   legalAddress: string
   bankName: string
   accountNumber: string
}

export type Profile = PersonalProfile | LegalProfile

export const useProfileStore = defineStore('profile', () => {
   const personal = ref<PersonalProfile>({
      id: 'personal',
      type: 'personal',
      name: '',
      phone: '',
      address: '',
   })

   const legalProfiles = ref<LegalProfile[]>([])

   function addLegal(data: Omit<LegalProfile, 'id' | 'type'>) {
      legalProfiles.value.push({
         id: 'legal-' + Date.now(),
         type: 'legal',
         ...data,
      })
   }

   function removeLegal(id: string) {
      legalProfiles.value = legalProfiles.value.filter((l) => l.id !== id)
   }

   function updatePersonal(data: Partial<PersonalProfile>) {
      Object.assign(personal.value, data)
   }

   function updateLegal(id: string, data: Partial<LegalProfile>) {
      const profile = legalProfiles.value.find((l) => l.id === id)
      if (profile) Object.assign(profile, data)
   }

   return {
      personal,
      legalProfiles,
      addLegal,
      removeLegal,
      updatePersonal,
      updateLegal,
   }
})
