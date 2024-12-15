const a =  document.createElement('a');

export function getAbsoluteUrl(url: string) {
  a.href = url;
  return a.href;
}
