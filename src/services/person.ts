import type { Person } from '@/types/counterparty'

// ─── Mock data ───────────────────────────────────────────────────────────────

const mockPersons: Person[] = [
   {
      id: 'b0279752-6d75-452c-9e06-a5272a539a2b',
      user_id: null,
      name: 'Алексей',
      last_name: 'Лукичев',
      middle_name: 'Вячеславович',
      full_name: 'Лукичев Алексей Вячеславович',
      phone: '',
      email: '',
      birth_date: '2026-03-04',
      companies: [
         {
            company_id: 'be94255a-be83-44f1-aef5-39b1a2ca2c2c',
            company_name: 'ООО СК "СПЕЦСТРОЙ"',
            role: 'owner',
            position: 'ГЕНЕРАЛЬНЫЙ ДИРЕКТОР',
            phone_work: '',
            phone_extra: '',
            email_work: '',
            email_extra: '',
            comment: '',
         },
      ],
   },
   {
      id: 'a1b2c3d4-1111-2222-3333-444455556666',
      user_id: null,
      name: 'Мария',
      last_name: 'Петрова',
      middle_name: 'Сергеевна',
      full_name: 'Петрова Мария Сергеевна',
      phone: '+7 (999) 123-45-67',
      email: 'petrova@mail.ru',
      birth_date: '1990-05-15',
      companies: [],
   },
   {
      id: 'c5d6e7f8-aaaa-bbbb-cccc-ddddeeeeffff',
      user_id: null,
      name: 'Иван',
      last_name: 'Иванов',
      middle_name: 'Иванович',
      full_name: 'Иванов Иван Иванович',
      phone: '+7 (912) 345-67-89',
      email: 'ivanov@mail.ru',
      birth_date: '1985-11-20',
      companies: [
         {
            company_id: 'ff112233-4455-6677-8899-aabbccddeeff',
            company_name: 'ИП Иванов И.И.',
            role: 'owner',
            position: 'Индивидуальный предприниматель',
            phone_work: '+7 (912) 345-67-89',
            phone_extra: '',
            email_work: 'ip.ivanov@mail.ru',
            email_extra: '',
            comment: '',
         },
      ],
   },
   {
      id: 'd9e0f1a2-3456-7890-abcd-ef1234567890',
      user_id: null,
      name: 'Екатерина',
      last_name: 'Козлова',
      middle_name: 'Дмитриевна',
      full_name: 'Козлова Екатерина Дмитриевна',
      phone: '',
      email: 'kozlova@example.com',
      birth_date: '1993-07-10',
      companies: [],
   },
   {
      id: 'e1f2a3b4-5678-9012-cdef-abcdef012345',
      user_id: null,
      name: 'Дмитрий',
      last_name: 'Новиков',
      middle_name: 'Александрович',
      full_name: 'Новиков Дмитрий Александрович',
      phone: '+7 (903) 876-54-32',
      email: '',
      birth_date: '1988-02-28',
      companies: [],
   },
]

// ─── Request types ───────────────────────────────────────────────────────────

export interface PersonCreate {
   user_id: string
   name: string
   last_naem: string
   middle_name: string
   phone_personal: string
   email_personal: string
   birth_date: string
}

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function getPersons(search?: string): Promise<Person[]> {
   return new Promise((resolve) => {
      setTimeout(() => {
         const result = search
            ? mockPersons.filter((p) =>
                 p.full_name.toLowerCase().includes(search.toLowerCase())
              )
            : mockPersons
         resolve(result)
      }, 300)
   })
}

export async function getPersonById(
   personId: string
): Promise<Person | undefined> {
   return new Promise((resolve) => {
      setTimeout(
         () => resolve(mockPersons.find((p) => p.id === personId)),
         300
      )
   })
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createPerson(data: PersonCreate): Promise<Person> {
   return new Promise((resolve) => {
      const created: Person = {
         id: crypto.randomUUID(),
         user_id: data.user_id || null,
         name: data.name,
         last_name: data.last_naem,
         middle_name: data.middle_name,
         full_name: `${data.last_naem} ${data.name} ${data.middle_name}`.trim(),
         phone: data.phone_personal,
         email: data.email_personal,
         birth_date: data.birth_date,
         companies: [],
      }

      mockPersons.push(created)
      setTimeout(() => resolve(created), 400)
   })
}
