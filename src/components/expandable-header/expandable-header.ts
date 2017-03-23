import { Component, Input, ElementRef, Renderer, ContentChildren } from '@angular/core';
import { Item } from 'ionic-angular';

@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeader {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;

  @ContentChildren(Item, {read: ElementRef}) children: any;

  newHeaderHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer) {

  }

  ngAfterViewInit(){

    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev){

    ev.domWrite(() => {

      this.newHeaderHeight = this.headerHeight - ev.scrollTop;

      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
      }   

      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');

      this.children.forEach((child) => {

        let headerElement = child.nativeElement;
        let totalHeight = headerElement.offsetTop + headerElement.clientHeight;
 
        if(totalHeight > this.newHeaderHeight && !headerElement.isHidden){
          headerElement.isHidden = true;
          this.renderer.setElementStyle(headerElement, 'opacity', '0');
        } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
          headerElement.isHidden = false;
          this.renderer.setElementStyle(headerElement, 'opacity', '0.7');
        }

      });

    });

  }

}
