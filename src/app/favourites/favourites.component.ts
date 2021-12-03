import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];
  subscription!: Subscription;

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit(): void {
    console.log('ngOnInit()')
    this.subscription = this.musicDataService
      .getFavourites()
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  removeFromFavourites(id: string): void {
    this.subscription.add(
      this.musicDataService.removeFromFavourites(id).subscribe(() => {
        // this.ngOnInit();
      })

    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  transformRunningTime(ms: number): string {
    let min: number = Math.trunc(ms / 60000);
    let sec: number = Math.trunc(ms / 1000) % 60;
    if (sec < 10) {
      return `${min}:0${sec}`;
    }
    return `${min}:${sec}`;
  }
}
