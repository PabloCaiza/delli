import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appImageUploader]',
  standalone: true
})
export class ImageUploaderDirective {
  @Output() dropFile: EventEmitter<File> = new EventEmitter<File>();
  @HostBinding('style.background') backgroundColor = DropColor.Default;

  @HostListener('dragover', ['$event']) dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.over;
  }

  @HostListener('dragleave', ['$event']) dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.Default;
  }

  @HostListener('mouseover') hover() {
    this.backgroundColor = DropColor.over;
  }
  @HostListener('mouseout') onMouseOut() {
    this.backgroundColor = DropColor.Default;
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.backgroundColor = DropColor.Default;
    if (event.dataTransfer && event.dataTransfer.files.length > 0)
      this.dropFile.emit(event.dataTransfer.files[0])
  }
}

enum DropColor {
  Default = 'var(--surface-ground)',
  over = 'var(--surface-hover)'
}
