import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { isDate, isObjectLike, isString } from 'lodash';
import * as moment from 'moment';

const _formatStr = 'YYYY-MM-DDTHH:mm:ssZ';

export const dateTimeScalar = new GraphQLScalarType({

	name: 'DateTime',

	serialize: (value: Date | moment.Moment | string) => {

		if (value === null || typeof value === 'undefined') {
			return null;
		}

		if (isDate(value)) {
			return moment(value).utc().format(_formatStr);
		} else if (isString(value)) {
			return moment(value, _formatStr).utc().format(_formatStr);
		} else if (isObjectLike(value)) {
			return value.utc().format(_formatStr);
		} else {
			throw new TypeError('Field error: value is an invalid date/time');
		}

	},

	parseValue: (value) => {

		const date = moment(value, _formatStr);
		if (!date.isValid()) {
			throw new TypeError('Field error: value is an invalid date/time');
		}

		return date.toDate();

	},

	parseLiteral: (literal) => {

		if (literal.kind !== Kind.STRING) {
			throw new GraphQLError(`Query error: Can only parse strings to dates but got a: ${literal.kind}`,
				[literal]);
		}

		const result = moment(literal.value, _formatStr);
		if (!result.isValid()) {
			throw new GraphQLError('Query error: Invalid date/time', [literal]);
		}

		return result.toDate();

	}

});
