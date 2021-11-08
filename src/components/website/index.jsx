import React, { Component } from 'react'
import Header from '../header'
import Content from '../content'
import PubSub from 'pubsub-js' //引入


export default class Website extends Component {
    componentDidMount(){
        PubSub.publish('tiaozhuan',this.props)
    }
    render() {
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        )
    }
}
