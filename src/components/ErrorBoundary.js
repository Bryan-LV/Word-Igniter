import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return ({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <h3 className="px-2 py-4 max-w-md mx-auto my-2 bg-white rounded-sm text-sm text-gray-500">Uh oh, looks like we couldn't retrieve this word...</h3>
    }
    return <>{this.props.children}</>
  }
}
