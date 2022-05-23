import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from '@cloudy/client/feature-dashboard/data-access';
import { MetricsResponse, UserProfile } from '@cloudy/shared/api';
import { faUserFriends, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  skip,
  startWith,
} from 'rxjs';

@Component({
  selector: 'cloudy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  faUserFriends = faUserFriends;
  faSearch = faSearch;

  readonly DEFAULT_METRICS = {
    total_files: '?',
    user_amount: '?',
    total_size: '?',
    total_space: '?',
    used_space: '?',
    used_space_percentage: '?',
    average_file_per_user: '?',
    average_used_space_per_user: '?',
  };

  users$: Observable<UserProfile[]> = of([]);
  public searchControl: FormControl = new FormControl('');

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

  currentMetrics$: Observable<MetricsResponse> =
    this.dashboardService.currentMetrics$.pipe(
      startWith(this.DEFAULT_METRICS),
      map((metrics) => metrics || this.DEFAULT_METRICS)
    );

  private readonly debounce: number = 400;
  ngOnInit(): void {
    this.currentMetrics$.pipe(
      delay(3000),
      skip(1)).subscribe((metrics) => {
        if(parseInt(metrics.used_space_percentage) >= 100) {
          this.toastr.error(this.translateService.instant('error.space-full'),'',{
            disableTimeOut: true,
          });
        } else if (parseInt(metrics.used_space_percentage) > 90) {
        this.toastr.warning(this.translateService.instant('error.almost-full'), '', {
          disableTimeOut: true,
        });
      }
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        filter((value) => value.length > 3)
      )
      .subscribe((query) => {
        this.users$ = this.dashboardService.getUsers(query);
      });

      this.searchControl.valueChanges
      .pipe(
        filter((value) => value.length <= 3)
      )
      .subscribe(() => {
        this.users$ = of([]);
      });
  }
}
