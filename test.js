
const resolveSteps = require('.')
const actionTree = generateActionTree()
const steps = resolveSteps(actionTree)
console.log(JSON.stringify(steps, null, 2))

function generateActionTree() {
  // this would be constructed through a bunch of real-world
  // functions, queuing up all the actions
  // and pointing outputs to inputs.
  return [
    { action: 'create', group: 'tb1', output: 'key1' },
    { action: 'create', group: 'tb2', output: 'key2' },
    { action: 'create', group: 'tb2', output: 'key3' },
    { action: 'create', group: 'tb3', output: 'key5' },
    { action: 'create', group: 'tb4', output: 'key6' },
    { action: 'create', group: 'tb3', output: 'key7' },
    { action: 'create', group: 'tb4', output: 'key8' },
    { action: 'create', group: 'tb3', output: 'key9' },
    { action: 'create', group: 'tb3', output: 'key10', input: {
      y: { type: 'binding', path: ['key6', 'foo'] },
      z: { type: 'binding', path: ['key1', 'bar'] }
    } },
    { action: 'create', group: 'tb1', output: 'key4', input: {
      x: { type: 'binding', path: ['key2', 'baz'] }
    } },
    { action: 'create', group: 'tb4', output: 'key11', input: {
      a: { type: 'binding', path: ['key10', 'z'] },
      b: { type: 'binding', path: ['key1', 'bar'] }
    } },
    { action: 'create', group: 'tb1', output: 'key12', input: {
      p: { type: 'binding', path: ['key10', 'z'] },
      q: { type: 'binding', path: ['key11', 'a'] }
    } },
    { action: 'create', group: 'tb4', output: 'key13' },
    { action: 'create', group: 'tb3', output: 'key14' },
    { action: 'create', group: 'tb4', output: 'key15', input: {
      a: { type: 'binding', path: ['key8', 'z'] },
    } },
    { action: 'create', group: 'tb5', output: 'key16' },
    { action: 'create', group: 'tb6', output: 'key17' },
    { action: 'create', group: 'tb6', output: 'key18', input: {
      m: { type: 'binding', path: ['key4', 'x'] },
    } },
    { action: 'create', group: 'tb6', output: 'key19', input: {
      m: { type: 'binding', path: ['key4', 'x'] },
      n: { type: 'binding', path: ['key13', 'a'] },
    } },
    { action: 'create', group: 'tb6', output: 'key20', input: {
      m: { type: 'binding', path: ['key18', 'm'] },
      n: { type: 'binding', path: ['key17', 'm'] },
    } },
    { action: 'create', group: 'tb1', output: 'key21' },
    { action: 'create', group: 'tb2', output: 'key22', input: {
      w: { type: 'binding', path: ['key18', 'm'] },
      x: { type: 'binding', path: ['key17', 'm'] },
    } },
    { action: 'create', group: 'tb2', output: 'key23' },
    { action: 'create', group: 'tb3', output: 'key24' },
  ]
}
