
export type Primitive =
	| number
	| string
	| symbol
	| boolean
	| null
	| undefined
	| bigint;
export type PrimitiveName =
	| 'number'
	| 'string'
	| 'symbol'
	| 'boolean'
	| 'null'
	| 'undefined'
	| 'bigint';

export const types = {
	number(val: any): val is number {
		return typeof val === 'number';
	},
	string(val: any): val is string {
		return typeof val === 'string';
	},
	symbol(val: any): val is symbol {
		return typeof val === 'symbol';
	},
	boolean(val: any): val is boolean {
		return typeof val === 'boolean';
	},
	null(val: any): val is null {
		return val === null;
	},
	undefined(val: any): val is undefined {
		return val === undefined;
	},
	bigint(val: any): val is bigint {
		return typeof val === 'bigint';
	},
};
export type Types = typeof types;

export function enrich<T extends Primitive>(
	type: ((val: any) => val is T),
	isValid: (val: T) => boolean
) {
	const unique: unique symbol = Symbol('EnrichedType');
	type EnrichedType = T & typeof unique;

	function isType(val: any): val is EnrichedType {
		return type(val) && isValid(val as any);
	}
	function assert(val: any): asserts val is EnrichedType {
		if (!isType(val)) {
			throw new Error(`Value (${ val }) is invalid`);
		}
	}

	return {
		isType,
		assert,
	};
}

export type IsType<TPredicate, TAlt = never> = TPredicate extends ((val: any) => val is (infer TType))
	? TType
	: TAlt;

export type EnrichedType<T extends ReturnType<typeof enrich>> =
	IsType<T[ 'isType' ]>;
