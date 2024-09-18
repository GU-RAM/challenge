import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltipOnclick]',
  standalone: true,
})
export class TooltipOnclickDirective {
  @Input('appTooltipOnclick') tooltipText: string = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.el.nativeElement.contains(event.target);
      if (!clickedInside && this.tooltipElement) {
        this.removeTooltip();
      }
    });
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
    if (this.tooltipElement) {
      this.removeTooltip();
    } else {
      this.createTooltip();
    }
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');

    if (this.tooltipElement !== null) {
      this.tooltipElement.textContent = this.tooltipText;

      this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    }
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
