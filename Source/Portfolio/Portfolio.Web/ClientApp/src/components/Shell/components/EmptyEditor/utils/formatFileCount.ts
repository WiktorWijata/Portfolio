/** "1 plik", "2 pliki", "5 plików" — Polish plural of the number of files. */
export function formatFileCount(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100
  if (count === 1) return '1 plik'
  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) return `${count} pliki`
  return `${count} plików`
}
