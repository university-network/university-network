var userSerializer = require('../../app/serializers/user');
var expect = require('chai').expect;
var mockery = require('mockery');

describe('UserSerializer', function () {
    describe('#serializeOne(user)', function () {
        var subject = userSerializer.serializeOne;

        it('is a function', function () {
            expect(userSerializer).to.has.property('serializeOne')
                .that.is.a('function');
        });

        describe('when user is invalid', function () {
            it('returns null', function () {
                expect(subject(null)).to.be.equal(null);
            });
        });

        describe('when user is valid', function () {
            var tokenStub = {
                generate:function(payload){
                    return "token";
                }
            };
            before(function () {
                mockery.registerAllowable('../../lib/token');
                mockery.registerMock('../../lib/token', tokenStub);
                mockery.enable({
                    warnOnReplace: false,
                    warnOnUnregistered: false,
                    useCleanCache: true
                });
            });
            after(function () {
                mockery.disable();
            });

            var user = {
                id: 1,
                name: 'ololo',
                photo: '///',
                email: 'asgs@',
                role: 'admin'
            };

            var expectedUser = {
                id: 1,
                name: 'ololo',
                photo: '///',
                email: 'asgs@',
                role: 'admin',
                token: 'token'
            };

            it('returns null', function () {
                console.log(subject(user));
                expect(subject(user)).to.deep.equal(expectedUser);
            });
        });
    });
});
