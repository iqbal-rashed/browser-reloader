export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  delay: number
): F {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  } as F;
}
