var taughtDisciplineSerializer = require('../../app/serializers/taught_discipline');
var expect = require('chai').expect;
var _ = require('lodash');
var FactoryGirl = require('../factories');

describe('TaughtDisciplineSerializer', function () {
    var buildTaughtDiscipline = function (taught_discipline) {
        return _.clone(taught_discipline);
    };

    var taught_discipline = FactoryGirl.create('taught_discipline').attributes();
    var expectedTaughtDiscipline = buildTaughtDiscipline(taught_discipline);

    describe('#serializeOne(taught_discipline)', function () {
        it('is a function', function () {
            expect(taughtDisciplineSerializer).to.has.property('serializeOne').that.is.a('function');
        });

        describe('when taught_discipline is invalid', function () {
            it('returns null', function () {
                expect(taughtDisciplineSerializer.serializeOne(null)).to.be.equal(null);
            });
        });

        describe('when taught_discipline is valid', function () {
            it('returns null', function () {
                expect(taughtDisciplineSerializer.serializeOne(taught_discipline)).to.deep.equal(expectedTaughtDiscipline);
            });
        });
    });

    describe('#serializeMany(taught_disciplines)', function () {
        it('is a function', function () {
            expect(taughtDisciplineSerializer).to.has.property('serializeMany').that.is.a('function');
        });

        describe('when taught_disciplines are invalid', function () {
            it('returns null', function () {
                expect(taughtDisciplineSerializer.serializeMany(null)).to.be.equal(null);
            });
        });

        describe('when taught_disciplines are valid', function () {
            var taughtDisciplines = FactoryGirl.createLists('taught_discipline');
            var expectedTaughtDiscipline = _.map(taughtDisciplines, buildTaughtDiscipline);

            it('returns serializes users', function () {
                expect(taughtDisciplineSerializer.serializeMany(taughtDisciplines)).to.deep.equal(expectedTaughtDiscipline);
            });
        });
    });

});

