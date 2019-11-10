/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function objectIsPonyfill(x, y) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
}

const is = typeof Object.is === 'function' ? Object.is : objectIsPonyfill

// https://github.com/facebook/react/blob/1022ee0ec140b8fce47c43ec57ee4a9f80f42eca/packages/react-reconciler/src/ReactFiberHooks.js#L326-L373
export default function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {
    return false
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    nextDeps.length !== prevDeps.length
  ) {
    // Don't bother comparing lengths in prod because these arrays should be
    // passed inline.
    console.warn(
      'Input have different size. The ' +
        'order and size of this array must remain constant.\n\n' +
        `Previous: [${prevDeps.join(', ')}]\n` +
        `Incoming: [${nextDeps.join(', ')}]`,
    )
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue
    }
    return false
  }
  return true
}
