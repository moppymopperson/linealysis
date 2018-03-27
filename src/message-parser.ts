import * as fs from 'fs';
import { IMessage, Message } from './message';
/**
 * Turns raw Line chat history into an array of `Message` objects
 */
export class MessageParser {
  private dateRegex = /(\d{4}\/\d{2}\/\d{2})\s\w{3}\s*/g;
  private messageRegex = /(\d{2}:\d{2})\t(.*)\t/g;

  /**
   * Parses a block of text, presumed to be loaded from a Line chat history
   * export text file, into an array of `Message` objects.
   *
   * @param text Line chat history
   */
  public parseText(text: string): [IMessage] {
    const dayInfo = this.splitDates(text);
    const dayMessages = dayInfo.map(x =>
      this.splitMessages(x.dateString, x.messages)
    );
    const allMessages = [].concat.apply([], dayMessages);
    return allMessages;
  }

  private splitDates(text: string) {
    const splitText = text.split(this.dateRegex);
    const header = splitText[0];
    const days = splitText.splice(1);
    const messages = [];
    for (let k = 0; k < days.length / 2; k += 2) {
      messages.push({
        dateString: days[k].trim(),
        messages: days[k + 1].trim(),
      });
    }
    return messages;
  }

  private splitMessages(day: string, text: string) {
    const messageInfo = text.split(this.messageRegex).filter(x => x !== '');
    const messages = [];
    for (let k = 0; k < messageInfo.length; k += 3) {
      const time = messageInfo[k].trim();
      const date = new Date(`${day}  ${time}`);
      const sender = messageInfo[k + 1].trim();
      const content = messageInfo[k + 2].trim();
      messages.push(Message(date, sender, content));
    }
    return messages;
  }
}
