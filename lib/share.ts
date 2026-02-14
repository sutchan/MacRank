// Version: 0.3.4
/**
 * Shares content using the native Web Share API if available,
 * otherwise falls back to copying text to the clipboard.
 */
export const shareContent = async (data: { title: string; text: string; url: string }): Promise<'shared' | 'copied' | 'error'> => {
  // 1. Try Native Web Share API
  if (
    typeof navigator !== 'undefined' && 
    navigator.share && 
    navigator.canShare && 
    navigator.canShare(data)
  ) {
    try {
      await navigator.share(data);
      return 'shared';
    } catch (error) {
      // Ignore AbortError (user cancelled the share sheet)
      if (error instanceof Error && error.name === 'AbortError') {
        return 'error';
      }
      // Continue to clipboard fallback on other errors
      console.warn('Web Share API failed, falling back to clipboard:', error);
    }
  }

  // 2. Fallback: Clipboard
  try {
    // Combine text and URL for clipboard since it handles plain text only
    const textToCopy = `${data.text}\n\n👉 ${data.url}`;
    await navigator.clipboard.writeText(textToCopy);
    return 'copied';
  } catch (err) {
    console.error('Clipboard share failed:', err);
    return 'error';
  }
};
