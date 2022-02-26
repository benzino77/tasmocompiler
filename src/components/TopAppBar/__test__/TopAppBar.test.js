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

// hack until we can upgrade to react@16.9.0
// https://github.com/testing-library/react-testing-library/issues/459
const originalError = console.error;

beforeAll(() => {
  // this is here to silence a warning temporarily
  // we'll fix it in the next exercise
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Please upgrade to at least react-dom@16.9.0')
    ) {
      return;
    }
    return originalError.call(console, args);
  });

  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => {
  console.error.mockRestore();
  server.close();
});

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
