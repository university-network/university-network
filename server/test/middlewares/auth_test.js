var auth = require('../../lib/auth');
var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var context = describe;

function invalidTokenExample(req) {
    it('returns error', function (done) {
        auth(req, {}, function (err) {
            expect(err).to.be.an('error');
            expect(err.message).to.be.equal('Invalid token!');
            done();
        });
    });
}

describe('AuthMiddleware', function () {

    var fakeModule;

    beforeEach(function(){
        auth = proxyquire('../../lib/auth', fakeModule);
    });

    it('is a function', function () {
        expect(auth).to.be.a('function');
    });

    context('when authorization header is not provided', function () {
        var req = {
            headers: {}
        };
        invalidTokenExample(req);
    });

    context('when authorization header is provided', function () {
        context('when token is valid', function(){
            var req,tokenMock;
            before(function () {
                req = {
                    headers: {
                        authorization: token
                    }
                };
                tokenMock = sinon.stub().callsWithAsync({
                    id:1,
                    role:'admin'
                });
                fakeModule = {
                    'jsonwebtoken': {
                        verify: tokenMock
                    }
                };

            });
            it('sets payload to req.user', function(done){
                expect(mockCallback.calledOnce).to.be.true;
                done();
            });
        });

        context('when token is invalid', function () {
            var req = {
                headers: {
                    authorization: 'foobar'
                }
            };
            invalidTokenExample(req);
        });
    });
});
