# React LongPressable

[![npm](https://img.shields.io/npm/v/react-longpressable.svg)](https://www.npmjs.com/package/react-longpressable)

Long-press wrapper for React that uses pointer events. Supports
normal clicks as well.

Pointer events are hardware agnostic, meaning that they can be triggered by a
mouse, a pen/stylus, or touch. Read more here:
https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

## Install
```
npm install --save react-longpressable
```

## Props
- onShortPress(event) (function): callback for normal clicks.
- onLongPress(event) (function): callback for long presses.
- longPressTime (number, default 500): duration of a long press in
milliseconds.
- dragThreshold (number, default 5): distance in pixels that the mouse is
allowed to move while clicking without canceling the long press.
- primaryMouseButtonOnly (boolean, default true): whether long presses are
only triggered by the left mouse button.

## Example
```javascript
import React from 'react';
import LongPressable from 'react-longpressable';

export default class Example extends React.PureComponent {

  onLongPress = (e) => {
    console.log('Long pressed.');
  }

  onShortPress = (e) => {
    console.log('Short pressed.');
  }

  render() {
    return (
      <LongPressable
        onShortPress={this.onShortPress}
        onLongPress={this.onLongPress}
        longPressTime={700}>
        <button>Press Me!</button>
      </LongPressable>
    );
  }

}
```
