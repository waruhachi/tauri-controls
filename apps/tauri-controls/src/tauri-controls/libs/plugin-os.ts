import type { OsType } from "@tauri-apps/plugin-os"

let osType: OsType | undefined = undefined
let osTypePromise: Promise<OsType> | null = null

if (typeof window !== "undefined") {
  osTypePromise = import("@tauri-apps/plugin-os").then((module) => {
    const type = module.type()
    osType = type // Assign the value of osType here
    return type // Return the value to the promise chain
  })
}

// A helper function to get the OS type, which returns a Promise
export function getOsType(): Promise<OsType> {
  if (!osTypePromise) {
    // If the module was already loaded, just return the result
    return Promise.resolve(osType!) // Use non-null assertion
  }

  // If the module is still loading, wait for it to finish and return the result
  return osTypePromise
}
