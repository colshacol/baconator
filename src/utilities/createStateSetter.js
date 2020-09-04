export const createStateSetter = (set, get) => (key) => (value) => {
  set({ [key]: value })
}