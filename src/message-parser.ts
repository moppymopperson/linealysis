import * as fs from 'fs'
import { Message } from './message'
/**
 * Turns raw Line chat history into an array of `Message` objects
 */
export class MessageParser {
  private dateRegex = /(\d{4}\/\d{2}\/\d{2})\s\w{3}\s*/g
  private messageRegex = /(\d{2}:\d{2})\t(.*)\t/g

  public parseText(text: string) {
    const dayInfo = this.splitDates(text)
    const dayMessages = dayInfo.map(x => this.splitMessages(x.dateString, x.messages))
    const allMessages = [].concat.apply([], dayMessages)
    return allMessages
  }

  private splitDates(text: string) {
    const splitText = text.split(this.dateRegex)
    const header = splitText[0]
    const days = splitText.splice(1)
    const messages = []
    for (let k = 0; k < days.length / 2; k += 2) {
      messages.push({
        dateString: days[k].trim(),
        messages: days[k + 1].trim()
      })
    }
    return messages
  }

  private splitMessages(day: string, text: string) {
    const messageInfo = text.split(this.messageRegex).filter(x => x !== '')
    const messages = []
    for (let k = 0; k < messageInfo.length; k += 3) {
      const time = messageInfo[k].trim()
      const date = new Date(`${day}  ${time}`)
      const sender = messageInfo[k + 1].trim()
      const content = messageInfo[k + 2].trim()
      messages.push(Message(date, sender, content))
    }
    return messages
  }
}

const sampleText = `
[LINE] Chat history with Kaori Date
Saved on: 2018/03/25 19:57

2015/12/25 Fri
07:33	Erik Hornberger	Merry Christmas!
07:34	Kaori Date	Merry Christmas! 
17:56	Kaori Date	「まもなく金沢文庫」

2015/12/26 Sat
08:35	Kaori Date	Good morning!
18:13	Erik Hornberger	やっぱり、出国検査で聞いてみたら再入国手続きあった！
19:27	Kaori Date	今日はお疲れの中休むことなく、遊んでくれてありがとう!

2015/12/27 Sun
07:11	Erik Hornberger	デトロイトに一時間早く到着した！
08:39	Erik Hornberger	まだ5時間くらいのこっているよ。
08:46	Erik Hornberger	"今日の領収書はありえないことになっている！笑
`

const out = new MessageParser().parseText(sampleText)
console.log(out)
