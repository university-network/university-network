var userSerializer = require('../../app/serializers/user');
var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru();

describe('UserSerializer', function () {
    describe('#serializeOne(user)', function () {
        it('is a function', function () {
            expect(userSerializer).to.has.property('serializeOne')
                .that.is.a('function');
        });

        describe('when user is invalid', function () {
            it('returns null', function () {
                expect(userSerializer.serializeOne(null)).to.be.equal(null);
            });
        });

        describe('when user is valid', function () {
            var user = {
                id: 1,
                name: 'name',
                photo: 'http://example.com/photo',
                email: 'email@i.ua',
                role: 'student'
            };
            var expectedUser = {
                id: 1,
                name: 'name',
                photo: 'http://example.com/photo',
                email: 'email@i.ua',
                role: 'student',
                token: 'token'
            };

            var tokenMock = {
                '../../lib/token': {
                    generate: function () {
                        return 'token';
                    }
                }
            };

            before(function () {
                userSerializer = proxyquire('../../app/serializers/user', tokenMock);
            });

            it('returns null', function () {
                expect(userSerializer.serializeOne(user)).to.equal(expectedUser);
            });
        });
    });
});
