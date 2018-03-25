export function Message(date: Date, sender: string, content: string) {
  return Object.freeze({ date, sender, content });
}
