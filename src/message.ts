export interface IMessage {
  readonly date: Date;
  readonly sender: string;
  readonly content: string;
}

export function Message(date: Date, sender: string, content: string) {
  return Object.freeze({ date, sender, content });
}
