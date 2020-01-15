import React, { Component } from 'react'
import { Image as RNImage, ImageProps } from 'react-native'

interface Props extends ImageProps {
  width?: number
  height?: number
}

class Image extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
  }

  UNSAFE_componentWillMount() {
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
      // @ts-ignore
      <RNImage {...this.props} style={[this.props.style, { height: this.state.height, width: this.state.width }]} />
    )
  }
}

export default Image
