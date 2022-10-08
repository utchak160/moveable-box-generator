import {
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  HostListener,
  ViewChildren,
  ViewContainerRef, QueryList,
} from '@angular/core';
import * as shortid from 'shortid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'flytbase-assignment';
  speed = 25;
  zIndexCount = 1;
  boxes = [
    { id: shortid.generate(), left: 0, right: 0, zIndex: this.zIndexCount },
  ];
  activeBox = this.boxes[0].id;
  @ViewChild('box') boxRef: ElementRef | undefined;
  @ViewChildren('sprites', { read: ViewContainerRef }) spritesRef: QueryList<ViewContainerRef> | undefined;
  spriteRef: ElementRef | undefined;

  @HostListener('window:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent) {
    console.log(event.key);
    this.handleMovement(event);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.spritesRef?.forEach((vcr, index) => {
      this.spriteRef = vcr.element;
    });
  }

  toNum(pxVal: string) {
    return parseInt(pxVal, 10);
  };

  handleMovement(e: KeyboardEvent) {
    const left = this.toNum(this.spriteRef?.nativeElement.style.left);
    const top = this.toNum(this.spriteRef?.nativeElement.style.top);

    switch (e.key) {
      case 'a':
      case 'ArrowLeft':
        if (left <= 0) return this.renderer.setStyle(this.spriteRef?.nativeElement, 'left', 0);
        this.renderer.setStyle(this.spriteRef?.nativeElement, 'left', left - this.speed + 'px');
        break;
      case 'd':
      case 'ArrowRight':
        if (left >= 775) return this.renderer.setStyle(this.spriteRef?.nativeElement, 'left', 775);
        this.renderer.setStyle(this.spriteRef?.nativeElement, 'left', left + this.speed + 'px');
        break;
      case 'w':
      case 'ArrowUp':
        if (top <= 0) return this.renderer.setStyle(this.spriteRef?.nativeElement, 'top', 0);
        this.renderer.setStyle(this.spriteRef?.nativeElement, 'top', top - this.speed + 'px');
        break;
      case 's':
      case 'ArrowDown':
        if (top >= 775) return this.renderer.setStyle(this.spriteRef?.nativeElement, 'top', 775);
        this.renderer.setStyle(this.spriteRef?.nativeElement, 'top', top + this.speed + 'px');
        break;
    }
  };

  addBox() {
    this.boxes = [
      ...this.boxes,
      { id: shortid.generate(), left: 0, right: 0, zIndex: ++this.zIndexCount },
    ];
  }

  activateBox(id: string) {
    console.log(id);
    this.spritesRef?.forEach((vcr, index) => {
      console.log(vcr.element.nativeElement.id);
      if (vcr.element.nativeElement.id == id) {
        this.spriteRef = vcr.element;
        this.activeBox = id;
      }
    });
  }
}
