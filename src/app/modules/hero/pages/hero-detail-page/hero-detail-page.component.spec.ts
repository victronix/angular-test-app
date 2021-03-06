import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeroDetailPageComponent } from './hero-detail-page.component';
import { MockComponent } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from '../../shared/hero.model';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { HeroService } from '../../shared/hero.service';
import { HeroLoadingComponent } from '~shared/components/hero-loading/hero-loading.component';
import { HeroCardComponent } from '~shared/components/hero-card/hero-card.component';

describe('HeroDetailPage', () => {
  let component: HeroDetailPageComponent;
  let fixture: ComponentFixture<HeroDetailPageComponent>;

  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NoopAnimationsModule],
        declarations: [
          MockComponent(HeroLoadingComponent),
          MockComponent(HeroCardComponent),
          HeroDetailPageComponent,
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                data: {
                  hero: of(new Hero({ id: '1' })),
                },
              },
            },
          },
          { provide: HeroService, useValue: heroServiceSpy },
          {
            provide: Location,
            useValue: {
              back: () => {},
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HeroDetailPageComponent);
      component = fixture.debugElement.componentInstance;
      heroServiceSpy.getHero.and.returnValue(
        of(new Hero({ id: '1', name: 'test', default: true }))
      );
      fixture.detectChanges();
    })
  );

  it('should create hero detail component', () => {
    expect(component).toBeTruthy();
    expect(component.hero?.id).toBe('1');
  });
});
