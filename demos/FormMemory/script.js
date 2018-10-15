class FormMemory {
  constructor() {
    this.formSelector = '';
    this.form = [];
    this.keyPrefix = '';

    this.elementEvents = {
      'input-email': 'keyup',
      'input-month': 'keyup',
      'input-number': 'keyup',
      'input-search': 'keyup',
      'input-tel': 'keyup',
      'input-text': 'keyup',
      'input-url': 'keyup',
      'input-week': 'keyup',
      'input-checkbox': 'change',
      'input-date': 'change',
      'input-hidden': 'change',
      'input-radio': 'change',
      'input-range': 'change',
      'input-time': 'change',
      'select': 'change'
    }

    this._keyup = this._keyup.bind(this);
    this._change = this._change.bind(this);
  }

  init(formSelector) {
    this.formSelector = formSelector;
    this.keyPrefix = `${formSelector}-`;
    this.form = document.querySelector(formSelector);

    if (this.form === null) {
      throw new Error(`FormMemory: Could not locate the form by the selector ${formSelector}`);
    }

    return this;
  }

  _forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, array[i], i);
    }

    return true;
  }

  _getInputKey(name) {
    return `${this.keyPrefix}${name}`;
  }

  restore() {
    this._forEach(this.form.elements, (el) => {
      const {name} = el;
      const key = this._getInputKey(name);
      if (localStorage.getItem(key) !== null) {
        el.value = localStorage.getItem(key);
      }
    });

    return true;
  }

  saveUserInput(el) {
    const {name, value} = el;
    if (!name) {
      throw new Error('FormMemory: Attempted to save value of an input which does not have a name.');
    }

    const key = this._getEvent(el);

    if (this.elementEvents.indexOf(key) !== -1) {
      return localStorage.setItem(this._getInputKey(name), value);
    }

    return false;
  }

  save() {
    this._forEach(this.form.elements, (el) => {
      this.saveUserInput(el);
    });

    return true;
  }

  _keyup(evt) {
    this.saveUserInput(evt.target);

    return true;
  }

  _change(evt) {
    this.saveUserInput(evt.target);

    return true;
  }

  _getEvent(el) {
    const tag = el.tagName.toLowerCase();
    const type = el.type;

    const key = `${tag}-${type}`;

    if (!!this.elementEvents[key]) {
      return this.elementEvents[key];
    }

    if (!!this.elementEvents[tag]) {
      return this.elementEvents[tag];
    }

    return null;
  }

  watch(initialRestore = false) {
    if (initialRestore) {
      this.restore();
    }

    this._forEach(this.form.elements, (el) => {
      const evt = this._getEvent(el);

      el.addEventListener(evt, this[`_${evt}`], false);
    });

    return true;
  }

  stop() {
    this._forEach(this.form.elements, (el) => {
      const evt = this._getEvent(el);
      el.removeEventListener(evt, this[`_${evt}`], false);
    });

    return true;
  }
}

/*
 * DEMO
 */

const formMemory = new FormMemory();

const saveBtn = document.querySelector('.js-save');
const restoreBtn = document.querySelector('.js-restore');
const watchStartBtn = document.querySelector('.js-watch-start');
const watchStopBtn = document.querySelector('.js-watch-stop');

saveBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  formMemory.save();
});

restoreBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  formMemory.restore();
});

watchStartBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  formMemory.watch();
  watchStopBtn.removeAttribute('disabled');
  watchStartBtn.setAttribute('disabled', 'disabled');
});

watchStopBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  formMemory.stop();
  watchStopBtn.setAttribute('disabled', 'disabled');
  watchStartBtn.removeAttribute('disabled');
});
