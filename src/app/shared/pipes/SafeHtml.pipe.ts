import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }

  transform(value: any): any {
    let doc = new DOMParser().parseFromString(value, 'text/html');
    this.convertOembedToIframe(doc);
    let serializedHtml = new XMLSerializer().serializeToString(doc.body);
    return this.sanitized.bypassSecurityTrustHtml(serializedHtml);
  }

  private convertOembedToIframe(document: Document): void {
    const oembeds = document.querySelectorAll('oembed[url]');
    oembeds.forEach((embed) => {
      const iframe = document.createElement('iframe');
      const youtubeId = this.extractYoutubeId(embed.getAttribute('url') || '');
      if (youtubeId) {
        iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
        iframe.width = "560";
        iframe.height = "315";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        if (embed.parentNode) {
          embed.parentNode.replaceChild(iframe, embed);
        } else {
          console.error('Parent node is null');
        }
      }
    });
  }


  private extractYoutubeId(url: string): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : '';
  }

}
