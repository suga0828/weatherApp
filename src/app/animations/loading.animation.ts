import { trigger, style, animate, query, stagger, transition } from '@angular/animations'

export const loadingAnimation = () => {
  return trigger('loading', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0 }),
        stagger(100, [
          animate('300ms', style({ opacity: 1 }))
        ])
      ], { optional: true }),
      query(':leave', [
        stagger(100, [
          animate('300ms', style({ opacity: 0 }))
        ])
      ], { optional: true })
    ])
  ]);
}
