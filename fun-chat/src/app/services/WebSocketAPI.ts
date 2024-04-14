import type { AuthMessage } from '../interfaces';

export class WebSocketAPI {
  public ws: WebSocket;
  public errorMessage = '';

  constructor() {
    this.ws = new WebSocket('ws://127.0.0.1:4000');
    this.ws.addEventListener('message', this.handleMessage.bind(this));
  }

  public userAuthentication(message: AuthMessage): void {
    console.log(message);
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      console.log(`message was send`);
    } else {
      this.ws.addEventListener('open', () => {
        this.ws.send(JSON.stringify(message));
      });
    }
  }

  private handleMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data);

    if (data.type === 'ERROR') {
      this.errorMessage = data.payload.error;
    }
  }
}
