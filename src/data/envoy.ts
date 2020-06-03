import { Data, DataFactory } from './data'
import { AdminJsonSchema, AdminDataSchema, AdminDataFactory } from './admin'

type EnvoyJsonSchema = {
  admin?: AdminJsonSchema
}

export type EnvoyDataSchema = Data<EnvoyJsonSchema> & {
  admin?: AdminDataSchema
}

export const EnvoyDataFactory: DataFactory<EnvoyJsonSchema, EnvoyDataSchema> = {
  create(json?: EnvoyJsonSchema): EnvoyDataSchema {
    const admin = json? AdminDataFactory.create(json.admin) : undefined
    return {
      admin,
      json: function() {
        return {
          ...(this.admin? {admin: this.admin?.json()} : {})
        }
      }
    } as EnvoyDataSchema
  }
}


// export class EnvoyData implements Data {
//   admin: AdminData|undefined = undefined
//   constructor(admin?: AdminData) {
//     this.admin = admin
//   }

//   json = () => (
//     {
//       ...(this.admin? {admin: this.admin.json()} : {})
//     }
//   )
//   copy = () => new EnvoyData(this.admin)
// }