import React from 'react'
import PropType from 'prop-types'

function eventToPosition(event) {
  return {
    x: event.clientX,
    y: event.clientY
  }
}

function distance(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  )
}

export default class LongPressable extends React.PureComponent {

  static propTypes = {
    onLongPress: PropType.func.isRequired,
    onShortPress: PropType.func,
    longPressTime: PropType.number,
    primaryMouseButtonOnly: PropType.bool,
    // Maximum distance (pixels) user is allowed to drag before
    // click is canceled
    dragThreshold: PropType.number,
    disabled: PropType.bool,
    children: PropType.node
  }

  static defaultProps = {
    longPressTime: 500,
    primaryMouseButtonOnly: true,
    dragThreshold: 100,
    disabled: false
  }

  isLongPressing = false
  startingPosition = { x: 0, y: 0 }

  cancelEvent = (e) => {
    e.stopPropagation();
  }

  onPointerUp = (e) => {
    if (this.timerID) {
      this.cancelLongPress()
    }

    const mousePosition = eventToPosition(e)

    if (!this.isLongPressing &&
        !this.exceedDragThreshold(mousePosition)) {
      this.props.onShortPress && this.props.onShortPress()
    }
    else {
      this.isLongPressing = false
    }
  }

  onPointerDown = (e) => {
    if (this.props.primaryMouseButtonOnly) {
      if (e.pointerType === 'mouse' && e.button !== 0) {
        return
      }
    }
  
    this.startingPosition = eventToPosition(e)

    this.timerID = setTimeout(() => {
      this.isLongPressing = true
      this.props.onLongPress && this.props.onLongPress()
    }, this.props.longPressTime)
  }

  onPointerMove = (e) => {
    const mousePosition = eventToPosition(e)
    if (this.timerID && this.exceedDragThreshold(mousePosition)) {
      this.cancelLongPress()
    }
  }

  onPointerLeave = () => {
    if (this.timerID) {
      this.cancelLongPress()
    }
  }

  cancelLongPress() {
    clearTimeout(this.timerID)
    this.timerID = null
  }

  exceedDragThreshold(point) {
    return distance(this.startingPosition, point) > this.props.dragThreshold
  }

  render() {
    var disabled = this.props.disabled;

    return (
      <div
        onContextMenu={e => e.preventDefault()}
        onClick={disabled ? this.cancelEvent : null}
        onPointerUp={disabled ? null : this.onPointerUp}
        onPointerDown={disabled ? null : this.onPointerDown}
        onPointerMove={disabled ? null : this.onPointerMove}
        onPointerLeave={disabled ? null : this.onPointerLeave}
      >
        {this.props.children}
      </div>
    )
  }

}
