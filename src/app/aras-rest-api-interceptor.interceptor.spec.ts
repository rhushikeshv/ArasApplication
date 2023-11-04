import { TestBed } from '@angular/core/testing';

import { ArasRestApiInterceptorInterceptor } from './aras-rest-api-interceptor.interceptor';

describe('ArasRestApiInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ArasRestApiInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ArasRestApiInterceptorInterceptor = TestBed.inject(ArasRestApiInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
