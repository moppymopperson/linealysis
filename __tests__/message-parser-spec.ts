import { Message } from '../src/message';
import { MessageParser } from '../src/message-parser';

const sampleText = `
[LINE] Chat history with Kaori Date
Saved on: 2018/03/25 19:57

2015/12/25 Fri
07:33	Erik Hornberger	Merry Christmas!
07:34	Kaori Date	Merry Christmas! 

2015/12/26 Sat
08:35	Kaori Date	Good morning!
19:27	Kaori Date	今日はお疲れの中休むことなく、遊んでくれてありがとう!
`;

describe('The MessageParser class', () => {
  it('Splits by date', () => {
    const sut = new MessageParser();
    const result = sut.parseText(sampleText);
    expect(result).toEqual([
      Message(
        new Date('2015/12/25 07:33'),
        'Erik Hornberger',
        'Merry Christmas!'
      ),
      Message(new Date('2015/12/25 07:34'), 'Kaori Date', 'Merry Christmas!'),
      Message(new Date('2015/12/26 08:35'), 'Kaori Date', 'Good morning!'),
      Message(
        new Date('2015/12/26 19:27'),
        'Kaori Date',
        '今日はお疲れの中休むことなく、遊んでくれてありがとう!'
      ),
    ]);
  });
});
