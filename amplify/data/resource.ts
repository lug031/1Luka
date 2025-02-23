import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Transaction: a
    .model({
      type: a.enum(['INGRESO', 'GASTO']),
      amount: a.float(),
      description: a.string(),
      category: a.string(),
      date: a.datetime(),
      userId: a.string(),
      createdAt: a.timestamp(),
      updatedAt: a.timestamp(),
    })
    .authorization((allow) => [
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      //allow.publicApiKey().to(['read', 'create', 'update', 'delete']),
    ]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
