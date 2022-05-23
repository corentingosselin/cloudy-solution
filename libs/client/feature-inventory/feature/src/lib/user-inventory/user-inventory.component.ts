import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@cloudy/client/feature-inventory/data-access';
import { FileService } from '@cloudy/client/shared';
import { UserInfoResponse } from '@cloudy/shared/api';
import {
  faBan,
  faCopy,
  faEye,
  faEyeSlash,
  faPortrait,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, take } from 'rxjs';

@Component({
  selector: 'cloudy-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss'],
})
export class UserInventoryComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faPortrait = faPortrait;
  faBan = faBan;
  faCopy = faCopy;
  constructor(
    public fileService: FileService,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

  public userId: number = -1;
  public user$: Observable<UserInfoResponse> = of({
    id: -1,
    firstname: 'Firstname',
    lastname: 'Lastname',
    email: 'test@mail.com',
    banned: false,
    view: true,
  });

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.fileService
      .getFilesByUserId(this.userId)
      .subscribe((files) => this.fileService.fileItems$.next(files));

    this.user$ = this.userService.getUserById(this.userId);
  }

  banUser() {
    this.user$.pipe(take(1)).subscribe((user) => {
      const newBanStatus = !user.banned;
      this.userService.banUser(this.userId, newBanStatus).subscribe(() => {
        const msg = this.translateService.instant(
          newBanStatus ? 'admin.user-banned' : 'admin.user-unbanned'
        );
        newBanStatus ? this.toastr.error(msg) : this.toastr.success(msg);
      });
      this.user$ = of({
        ...user,
        banned: newBanStatus,
      });
    });
  }

  viewUser() {
    this.user$.pipe(take(1)).subscribe((user) => {
      const newViewStatus = !user.view;
      this.userService.toggleView(this.userId, newViewStatus).subscribe(() => {
        const msg = this.translateService.instant(
          newViewStatus ? 'admin.user-view' : 'admin.user-unview'
        );
        newViewStatus ? this.toastr.success(msg) : this.toastr.error(msg);
        this.user$ = of({
          ...user,
          view: newViewStatus
        });
      });
    });
  }
}
