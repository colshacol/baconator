import wretch from "wretch"
import { of } from "await-of"

const get = (url) => {
  return of(wretch(url).get().json())
}

const post = (url, data) => {
  return of(wretch(url).post(data).json())
}

export const fetch = {
  get,
  post,
}
