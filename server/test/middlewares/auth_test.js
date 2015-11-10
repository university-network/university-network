var context = describe;
var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('AuthMiddleware', function () {
    var auth, req, res, error, decoded, verify, tokenDouble;

    beforeEach(function () {
        verify = sinon.stub();

        auth = proxyquire('../../lib/auth', {
            'jsonwebtoken': {
                verify: verify
            }
        });
    });

    it('is a function', function () {
        expect(auth).to.be.a('function');
    });

    context('when authorization header is not provided', function () {
        beforeEach(function () {
            req = {
                headers: {}
            };

            verify = sinon.spy();
            auth = proxyquire('../../lib/auth', {
                'jsonwebtoken': {
                    verify: verify
                }
            });
        });

        describe('using dependencies', function () {
            it('does not call verify spy ', function () {
                auth(req, res, function () {
                });

                expect(verify).to.have.not.been.called;
            });
        });

        describe('callback', function () {
            it('is called once', function (done) {
                var callbackSpy = sinon.spy();
                auth(req, res, callbackSpy);

                process.nextTick(function () {
                    expect(callbackSpy).to.have.been.calledOnce;
                    done();
                });
            });

            it('is pass the error', function (done) {
                auth(req, res, function (err) {
                    expect(err).to.be.an('error');
                    expect(err.message).to.be.equal('Authorization header is missing!');
                    done();
                });
            });
        });
    });

    context('when authorization header is provided', function () {
        beforeEach(function () {
            tokenDouble = 'foobar';

            req = {
                headers: {
                    authorization: tokenDouble
                }
            };

        });

        describe('using dependencies', function () {
            beforeEach(function () {
                verify = sinon.spy();
                auth = proxyquire('../../lib/auth', {
                    'jsonwebtoken': {
                        verify: verify
                    }
                });
            });

            it('calls verify spy once with token double', function () {
                auth(req, res);

                expect(verify).to.have.been.calledOnce;
                expect(verify).to.have.been.calledWithMatch(tokenDouble);
            });
        });

        context('when token is valid', function () {
            beforeEach(function () {
                decoded = {
                    id: 1,
                    role: 'admin'
                };
            });

            describe('callback', function () {
                beforeEach(function () {
                    verify.callsArgWithAsync(2, error, decoded);
                });

                it('is called once', function (done) {
                    var callbackSpy = sinon.spy();
                    auth(req, res, callbackSpy);

                    process.nextTick(function () {
                        expect(callbackSpy).to.have.been.calledOnce;
                        done();
                    });
                });

                it('is called without error', function (done) {
                    auth(req, res, function (err) {
                        expect(err).to.not.exist;
                        done();
                    });
                });

                it('is called with updated req', function (done) {
                    auth(req, res, function (err, newReq, newRes) {
                        expect(newReq).to.have.property('user')
                            .that.is.an('object')
                            .that.deep.equals(decoded);
                        done();
                    });
                });

                it('is called with the same res', function (done) {
                    auth(req, res, function (err, newReq, newRes) {
                        expect(newRes).to.deep.equals(res);
                        done();
                    });
                });
            });
        });

        context('when token is invalid', function () {
            describe('callback', function () {
                beforeEach(function () {
                    error = new Error('Invalid token!');
                    error.status = 401;
                    decoded = null;
                    verify.callsArgWithAsync(2, error, decoded);
                });

                it('is called once', function (done) {
                    var callbackSpy = sinon.spy();
                    auth(req, res, callbackSpy);

                    process.nextTick(function () {
                        expect(callbackSpy).to.have.been.calledOnce;
                        done();
                    });
                });

                it('is called with error', function (done) {
                    auth(req, res, function (err) {
                        expect(err).to.be.an('error');
                        expect(err.message).to.be.equal('Invalid token!');
                        expect(err.status).to.be.equal(401);
                        done();
                    });
                });

                it('is called with the same req', function (done) {
                    auth(req, res, function (err, newReq, newRes) {
                        expect(newReq).to.deep.equals(req);
                        done();
                    });
                });

                it('is called with the same res', function (done) {
                    auth(req, res, function (err, newReq, newRes) {
                        expect(newRes).to.deep.equals(res);
                        done();
                    });
                });
            });
        });
    });
});
