import { create } from "zustand";
export const useStore = create((set) => ({
  name: "",
  tldr: "",
  links: "",
  setName: (name) => set({ name }),
  setTldr: (tldr) => set({ tldr }),
  setLinks: (links) => set({ links }),
}));
