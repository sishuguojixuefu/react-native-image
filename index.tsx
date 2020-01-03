import React, { Component } from 'react'
import { Image as RNImage, ImageProps, View } from 'react-native'

class Image extends Component<ImageProps, any> {
  constructor(props: ImageProps) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
    const { width, height, source } = this.props
    if (typeof source === 'number') {
      const info = RNImage.resolveAssetSource(source)
      const p = info.width / info.height
      this.setState({
        width: width || height! * p,
        height: height || width! / p,
      })
    } else {
      // @ts-ignore
      RNImage.getSize(source.uri, (w, h) => {
        const p = w / h
        this.setState({
          width: width || height! * p,
          height: height || width! / p,
        })
      })
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <RNImage {...this.props} style={[this.props.style, { height: this.state.height, width: this.state.width }]} />
      </View>
    )
  }
}

export default Image
