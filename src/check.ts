import { enrich, EnrichedType, types } from '.';

const nonEmptyString = enrich(types.string, str => !!str);
type NonEmptyString = EnrichedType<typeof nonEmptyString>;
const assertNonEmpty: (typeof nonEmptyString)[ 'assert' ] = nonEmptyString.assert;
const str = 'la';
assertNonEmpty(str);

const nonEmpt: NonEmptyString = str;

const str2 = 'la2';

if (!nonEmptyString.isType(str2)) {
	throw new Error();
}

const nonEmpt2: NonEmptyString = str2;

const nonEmpt3: NonEmptyString = nonEmptyString.asType('lala');

const atLeast2CharsString = enrich(nonEmptyString.isType, str => str.length > 1);
type AtLeast2CharsString = EnrichedType<typeof atLeast2CharsString>;

const at1: AtLeast2CharsString = nonEmpt2;
const at2: NonEmptyString = atLeast2CharsString.asType(nonEmpt);
