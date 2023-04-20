import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface IMessage {
  text: string;
  user: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements AfterViewInit {
  messages: IMessage[] = [];
  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild('messageList') messageList!: ElementRef;

  constructor(private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    const messageList = this.messageList.nativeElement;

    const observer = new MutationObserver(() => {
      messageList.scrollTop = messageList.scrollHeight;
    });

    observer.observe(messageList, { childList: true });
  }

  sendMessage(messageText: string) {
    if (messageText.trim() === '') {
      const config = new MatSnackBarConfig();
      config.duration = 1000;
      this.snackBar.open('Mensagem vazia', '', config);
      return;
    }

    this.messages.push({ text: messageText, user: 'you' });
    this.scrollToBottom();

    setTimeout(() => {
      const responseText = 'Oi, eu sou um robô!';
      this.messages.push({ text: responseText, user: 'robot' });
      this.scrollToBottom();
    }, 350);
  }

  scrollToBottom() {
    const messageList = this.messageList.nativeElement;
    messageList.scrollTop = messageList.scrollHeight;
  }
}
