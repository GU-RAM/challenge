import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText',
  standalone: true,
})
export class HighlightTextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Regex to find the number before the "/"
    const regex = /(\d+)(\/\d+)/;
    return value.replace(regex, '<span class="highlight">$1</span>$2');
  }
}
