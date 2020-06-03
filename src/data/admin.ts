import { Data, DataFactory } from './data'

export type AdminJsonSchema = {
  access_log_path: string,
  address: {
    socket_address: {
      address: string,
      port_value: number
    }
  }
}

export type AdminDataSchema = Data<AdminJsonSchema> & {
  access_log_path: string,
  socket_address: string,
  socket_port: number
}

export const AdminDataFactory: DataFactory<AdminJsonSchema, AdminDataSchema> = {
  create(json?: AdminJsonSchema): AdminDataSchema {
    const access_log_path = json?.access_log_path?? "/tmp/admin_access.log"
    const socket_address = json?.address.socket_address.address?? "0.0.0.0"
    const socket_port = json?.address.socket_address.port_value?? 9901
    return {
      access_log_path,
      socket_address,
      socket_port,
      json: function() {
        return {
          access_log_path: this.access_log_path,
          address: {
            socket_address: {
              address: this.socket_address,
              port_value: this.socket_port
            }
          }
        }
      }
    } as AdminDataSchema
  }
}
