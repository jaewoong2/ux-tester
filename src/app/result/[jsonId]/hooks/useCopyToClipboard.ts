type CopyFn = (text: string) => Promise<boolean> // Return success

export function useCopyToClipboard(): CopyFn {
  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      return false
    }
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      return false
    }
  }

  return copy
}
