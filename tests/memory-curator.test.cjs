const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

function dummyElement() {
  return {
    dataset: {}, style: {}, className: '', textContent: '', innerHTML: '', hidden: false,
    disabled: false, checked: false, value: '', files: [], offsetWidth: 32, offsetHeight: 32,
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, removeEventListener() {}, appendChild() {}, replaceChildren() {},
    remove() {}, click() {}, reset() {}, focus() {}, setPointerCapture() {}, releasePointerCapture() {},
    querySelector() { return dummyElement(); }, querySelectorAll() { return []; }, closest() { return null; },
    setAttribute() {}, getAttribute() { return null; }
  };
}

const elements = new Map();
function getElement(id) {
  if (!elements.has(id)) elements.set(id, dummyElement());
  return elements.get(id);
}

let memoryState = { enabled: true, memories: ['- [CORE] Original fact'] };
let corruptNextWrite = false;
let failNextRead = false;
const variables = new Map();
const tavo = {
  get(key) { return variables.get(key) ?? null; },
  set(key, value) { variables.set(key, value); },
  memory: {
    async current() {
      if (failNextRead) { failNextRead = false; throw new Error('transient verification read failure'); }
      return JSON.parse(JSON.stringify(memoryState));
    },
    async update(next) {
      memoryState = JSON.parse(JSON.stringify(next));
      if (corruptNextWrite) {
        corruptNextWrite = false;
        memoryState.memories = ['corrupted'];
      }
      return 1;
    }
  },
  async generate() {
    return '<MEMORIES>\n- [CURRENT] Repaired fact\n</MEMORIES>\n<CHANGES>\n- Repaired formatting\n</CHANGES>';
  },
  utils: { toast() {} }
};

const harness = {};
const context = {
  console, Math, Date, JSON, Object, Array, Set, Map, String, Number, Boolean, Promise,
  tavo, __memoryCuratorTestHarness: harness,
  document: {
    getElementById: getElement,
    createElement() { return dummyElement(); },
    execCommand() { return true; },
    body: dummyElement()
  },
  window: {
    innerWidth: 390, innerHeight: 844, visualViewport: null,
    addEventListener() {}, setTimeout, clearTimeout, setInterval, clearInterval,
    confirm() { return true; }
  },
  navigator: { clipboard: { async writeText() {} } },
  setTimeout, clearTimeout, setInterval() { return 1; }, clearInterval
};

const html = fs.readFileSync(path.join(__dirname, '..', 'ui', 'panel.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
vm.runInNewContext(scripts.at(-1)[1], context, { filename: 'ui/panel.html' });

function plain(value) { return JSON.parse(JSON.stringify(value)); }

(async () => {
  const parsed = harness.parseCleanupResponse(
    '<think>private reasoning</think>\n<MEMORIES>\n- [CORE] Stable fact\n</MEMORIES>\n<CHANGES>\n- Removed duplicate\n</CHANGES>'
  );
  assert.deepStrictEqual(plain(parsed.memories), ['- [CORE] Stable fact']);
  assert.deepStrictEqual(plain(parsed.changes), ['Removed duplicate']);
  assert.throws(() => harness.parseCleanupResponse('<analysis>unfinished output</analysis>'), /no categorized memory lines/i);

  const repaired = await harness.parseCleanupWithRepair('not a supported response');
  assert.strictEqual(repaired.repaired, true);
  assert.deepStrictEqual(plain(repaired.memories), ['- [CURRENT] Repaired fact']);

  assert.doesNotThrow(() => harness.assertProposalCurrent(memoryState, memoryState));
  assert.throws(() => harness.assertProposalCurrent({ enabled: true, memories: ['new fact'] }, memoryState), /changed after this proposal/);

  const desired = { enabled: true, memories: ['- [CURRENT] Updated fact'] };
  const original = { enabled: true, memories: ['- [CORE] Original fact'] };
  await harness.persistMemoryState(desired, original);
  assert.deepStrictEqual(memoryState, desired, 'A verified update should remain committed.');

  memoryState = JSON.parse(JSON.stringify(original));
  corruptNextWrite = true;
  await assert.rejects(
    harness.persistMemoryState(desired, original),
    /restored automatically/i,
    'A mismatched write must fail and restore the previous memory state.'
  );
  assert.deepStrictEqual(memoryState, original, 'Rollback must restore the exact previous memory state.');

  memoryState = JSON.parse(JSON.stringify(original));
  failNextRead = true;
  await assert.rejects(harness.persistMemoryState(desired, original), /restored automatically/i);
  assert.deepStrictEqual(memoryState, original, 'A thrown verification read must also restore previous memories.');

  const normalRead = tavo.memory.current;
  tavo.memory.current = async () => { throw new Error('persistent read failure'); };
  await assert.rejects(harness.persistMemoryState(desired, original), /rollback could not be verified/i);
  assert.deepStrictEqual(memoryState, original, 'Rollback should still be attempted if verification stays unavailable.');
  tavo.memory.current = normalRead;

  console.log('Memory Curator parser and persistence safeguards passed.');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
