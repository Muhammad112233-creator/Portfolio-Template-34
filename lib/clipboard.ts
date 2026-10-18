/** Copy on HTTPS/localhost, with a legacy fallback for restrictive preview frames. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // A browser or embedded preview can deny the modern clipboard API.
  }
  const previous = document.activeElement;
  const field = document.createElement('textarea');
  field.value = text;
  field.readOnly = true;
  field.tabIndex = -1;
  field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;font-size:16px;';
  document.body.append(field);
  field.focus({ preventScroll: true });
  field.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    /* Offer a manual copy UI instead. */
  } finally {
    field.remove();
    if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
  }
  return copied;
}
