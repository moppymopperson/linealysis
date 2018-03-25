import { MessageParser } from '../src/message-parser';

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
`;

describe('The MessageParser class', () => {
  it('Splits by date', () => {
    const sut = new MessageParser();
    const result = sut.parseText(sampleText);
    expect(result).toEqual([
      {
        dateText: '2018/03/13 Wed',
        text: `aaa
        bbb`,
      },
      {
        dateText: '2014/12/20 Fri',
        text: `ccc
        ddd`,
      },
    ]);
  });
});
