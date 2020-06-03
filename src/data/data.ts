export type Data<A> = {
  json(): A
}
export type DataFactory<A, B = Data<A>> = {
  create(json?: A): B
}