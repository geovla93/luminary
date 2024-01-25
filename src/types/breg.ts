export interface IMessage {
  text: string;
  kind: 'text';
  type: 'received' | 'sent';
}
