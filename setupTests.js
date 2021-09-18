/**
 * Disable the ESLint `import/no-extraneous-dependencies` for import mockdate
 * mockdate is only use for unit-test,
 * so keep it in devDependencies
 */
import MockDate from 'mockdate'; // eslint-disable-line import/no-extraneous-dependencies

/**
 * Mock `Date` to change when "now" is for unit test
 */
MockDate.set('2021-01-02T03:04:05.000Z');
