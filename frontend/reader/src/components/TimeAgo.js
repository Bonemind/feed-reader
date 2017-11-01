const { h, Component } = require('preact');
const timeago = require('timeago.js');

// Copied from: https://github.com/dzhurley/preact-timeago
// The MIT License (MIT)

// Copyright (c) 2016 Derek Hurley

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

class TimeAgo extends Component {
    componentWillMount() {
        this.instance = timeago();
    }

    componentDidMount() {
        this.renderTimeAgo();
    }

    componentDidUpdate() {
        this.renderTimeAgo();
    }

    renderTimeAgo() {
        const { datetime, live=false } = this.props;

        if (!this.base || (live === false)) return;

        // When used in combination with jsdom for headless testing, we need to ensure that
        // `dataset` exists on the base until https://github.com/tmpvar/jsdom/issues/961 is
        // resolved, as under the covers timeago.js checks `dataset` before `getAttribute`.
        //
        // TODO: pull request timeago.js to reorder checks on `getAttribute`/`dataset`.
        if (typeof this.base.dataset == 'undefined') {
            this.base.dataset = {};
        }

        this.base.setAttribute('datetime', datetime.getTime ? datetime.getTime() : datetime);
        this.instance.render(this.base);
    }

    render(props) {
        return h('time', { 'class': props.class }, this.instance.format(props.datetime));
    }
}

module.exports = TimeAgo;
