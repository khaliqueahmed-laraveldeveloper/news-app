import React, { Component } from 'react'

export default class test extends Component {
    constructor(props) {
        super(props);
        console.log('i am constructor');
    }
    componentDidMount() {
        console.log('i am component did mount');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('i am component did update');
    }

    render() {
        return (
            console.log('i am rednering method'),
            <div>
                {this.props.name}
            </div>
        )
    }
}
