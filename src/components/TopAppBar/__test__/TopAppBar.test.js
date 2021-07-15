import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByTestId,
} from '@testing-library/react';
import TopAppBar from '../TopAppBar';
import { allMessages } from '../../../locales/languages';

const expectedVersion = '6.0.2';

const server = setupServer(
  rest.get('/api/v1/tcversion', (req, res, ctx) => {
    return res(ctx.json({ ok: true, version: expectedVersion }));
  })
);

let supportedLocales = [];
for (const l in allMessages) {
  supportedLocales.push(...allMessages[l].browserLang);
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('should render TasmoCompiler version for language', async () => {
  const ret = render(
    <TopAppBar classes={{}} locale={'pl'} changeLanguage={() => {}} />
  );
  const regex = new RegExp(`${expectedVersion}`);
  const titleElement = await screen.findByText(regex);
  //   console.log(titleElement);
  // screen.debug();
  expect(titleElement).toBeInTheDocument;
});
