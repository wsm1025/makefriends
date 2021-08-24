import React, { Component } from 'react'
import './index.css'
export default class preview extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      isshow: false
    }
  }
  componentWillReceiveProps() {
    this.setState({
      isshow: this.props.isshow
    })
  }
  render() {
    return (
      this.state.isshow ?
        <div className="img_wsm" onClick={() => {
          this.setState({
            isshow: false
          })
        }
        }>
          <img src={this.props.url} alt="img" />
        </div>
        :
        ''
    )
  }
}
