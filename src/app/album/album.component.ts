import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  subscription!: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.subscription = this.musicDataService
      .getAlbumById(id)
      .subscribe((data) => {
        this.album = data;
        console.log('this.album', this.album);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addToFavourites(id: String): void {
    if (this.musicDataService.addToFavourites(id)) {
      this.snackBar.open('Adding to Favourites...', 'Done', { duration: 1500 });
    }
    console.log('favourite-list', this.musicDataService.getFavourites());
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
