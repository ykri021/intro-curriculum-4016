'use strict';
const request = require('supertest');
const app = require('../app');
const passportStub = require('passport-stub');

describe('/login', () => {
  before(() => {
    passportStub.install(app);
    passportStub.login({ username: 'testuser' });
  });
  
  after(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

describe('/logout', () => {
  it('/ にリダイレクトされる', (done) => {
    request(app)
      .get('/logout')
      .expect('Location', '/')
      .expect(302, done);
  });
});

  it('ログインのためのリンクが含まれる', (done) => {
    request(app)
      .get('/login')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<a href="\/auth\/github"/)
      .expect(200, done);
  });

  it('ログイン時はユーザー名が表示される', (done) => {
    request(app)
      .get('/login')
      .expect(/testuser/)
      .expect(200, done);
  });
});