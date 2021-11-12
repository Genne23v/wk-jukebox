import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];

  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.musicDataService.getFavourites().subscribe(data => {
      console.log('favourites', data);
      this.favourites = data
    })
  }

  removeFromFavourites(id: String): void{
    this.musicDataService.removeFromFavourites(id).subscribe();
  }
}
