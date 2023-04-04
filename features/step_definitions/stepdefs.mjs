import { Given, Then, When } from '@cucumber/cucumber';
import { Service } from '@theprelude/sdk';
import assert from 'assert';
import fetch, { Headers, Request, Response } from 'node-fetch';

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

Given('handle is {string}', function (handle) {
  this.handle = handle;
});

When('I create an account', async function () {
  try {
    const service = new Service({
      host: 'https://api.staging.preludesecurity.com',
    });
    const response = await service.iam.newAccount(this.handle);
    this.token = response.token;
  } catch (err) {
    this.error = err;
  }
});

Then('I should get an error', function () {
  assert(this.error instanceof Error);
});

Then('I should get a token back', function () {
  assert(typeof this.token === 'string');
});
