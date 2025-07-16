import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('urlSearchMovie', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
