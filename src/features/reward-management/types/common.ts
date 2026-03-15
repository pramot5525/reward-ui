export type BaseResponsePagination<T> = {
  meta: {
    totalCount: number
  }
  data: T[]
}

export type BaseResponseData<T> = {
  data: T
}
