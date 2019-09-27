import { Kind } from 'graphql';
import * as moment from 'moment-timezone';
import { dateTimeScalar } from '../datetime.scalar';

describe('datetimeScalar', () => {

	it('should serialize null/undefined value', () => {

		expect(dateTimeScalar.serialize(null)).toEqual(null);
		expect(dateTimeScalar.serialize(undefined)).toEqual(null);

	});

	it('should serialize DateTime value', () => {

		const result = '2019-01-11T17:34:12+00:00';
		const input = '2019-01-11T12:34:12.200';

		const date = moment(input).tz('America/New_York').toDate();
		const str = input;
		const mt = moment(input);
		const num = 123445;

		expect(dateTimeScalar.serialize(date)).toEqual(result);
		expect(dateTimeScalar.serialize(str)).toEqual(result);
		expect(dateTimeScalar.serialize(mt)).toEqual(result);
		expect(() =>
			dateTimeScalar.serialize(num)
		).toThrowErrorMatchingSnapshot();

	});

	it('should parse DateTime value', () => {

		const input = '2019-01-11T17:34:12+00:00';

		expect(dateTimeScalar.parseValue(input)).toMatchSnapshot();

	});

	it('should throw error when parsing DateTime value', () => {

		const input = 'Some weird string';

		expect(() =>
			dateTimeScalar.parseValue(input)
		).toThrowErrorMatchingSnapshot();

	});

	it('should parse literal', () => {

		const input = '2019-01-11T17:34:12+00:00';
		expect(dateTimeScalar.parseLiteral({
			kind: Kind.STRING,
			value: input
		}, {})).toMatchSnapshot();

	});

	it('should throw error when parsing non-string literal', () => {

		expect(() =>
			dateTimeScalar.parseLiteral({
				kind: Kind.BOOLEAN,
				value: true
			}, {})
		).toThrowErrorMatchingSnapshot();

	});

	it('should throw error when parsing literal with bad date', () => {

		const input = 'Some weird string';
		expect(() =>
			dateTimeScalar.parseLiteral({
				kind: Kind.STRING,
				value: input
			}, {})
		).toThrowErrorMatchingSnapshot();

	});

});
