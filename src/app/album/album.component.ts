import { Component, OnInit } from '@angular/core';
import albumData from '../data/SearchResultsAlbum.json'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album:any;

  constructor() { }

  ngOnInit(): void {
    this.album = albumData;
  }

  transformRunningTime(ms:number):string {
    let min:number = Math.trunc(ms/60000);
    let sec:number = Math.trunc(ms/1000) %60;
    return `${min}:${sec}`;
  }
}
