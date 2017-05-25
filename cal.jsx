const root = document.querySelector('#container');
class Screen extends React.Component {
    render() {
        return (
            <div className="screen">
                <div className="number">{this.props.num}</div>
            </div>
        )
    }
}
class Operator extends React.Component {
    render() {
        var buttons = this.props.data.map((v, i)=>(
            <div className="item"
                 onClick={()=>this.props.fn(v)}
                 key={i}>
                <div className="text">{v.name}</div>
            </div>
        ));
        return (
            <div className="operator">
                {buttons}
            </div>
        )
    }
}
class Cal extends React.Component {
    constructor() {
        super();
        this.state = {
            number: 0,
            first: '',
            second: '',
            o: '',
            flag1: true,
            flag2: true
        }
        this.change = this.change.bind(this);
        this.processNumber = this.processNumber.bind(this);
        this.processO = this.processO.bind(this);
        this.processEqual = this.processEqual.bind(this);
    }

    processNumber(v) {
        if (!this.state.o) {
            var first = this.state.first + v;
            this.setState({
                first: first,
                number: first
            })
        } else {
            var second = this.state.second + v;
            this.setState({
                second: second,
                number: second
            })
        }
    }

    processO(v) {
        if (this.state.first) {
            this.setState({
                o: v.name
            })
        }
    }

    processEqual() {
        if (this.state.o) {
            var result;
            if (this.state.o === "+") {
                result = parseFloat(this.state.first) + parseFloat(this.state.second);
            }
            if (this.state.o === "-") {
                result = this.state.first - this.state.second;
            }
            if (this.state.o === "*") {
                result = this.state.first * this.state.second;
            }
            if (this.state.o === "/") {
                result = this.state.first / this.state.second;
            }
            if (this.state.o === "%") {
                result = this.state.first % this.state.second;
            }
            if (result.toString().split('.')[1] && result.toString().split('.')[1].length > 4) {
                result = result.toFixed(4);
            }
            this.setState({
                number: result,
                first: '',
                second: '',
                o: '',
                flag1: true,
                flag2: true
            })
        }
    }

    processDelect() {
        if (!this.state.o) {
            var first = this.state.first.slice(0, -1);
            this.setState({
                first: first,
                number: first
            })
        } else {
            var second = this.state.second.slice(0, -1);
            this.setState({
                second: second,
                number: second
            })
        }
    }

    processClear() {
        this.setState({
            number: 0,
            first: '',
            second: '',
            o: ''
        })
    }

    processLink() {
        if (this.state.first && !this.state.o && this.state.flag1) {
            var first = this.state.first + '.';
            this.setState({
                first: first,
                number: first,
                flag1: false
            })
        }
        if (this.state.second && this.state.o && this.state.flag2) {
            var second = this.state.second + '.';
            this.setState({
                second: second,
                number: second,
                flag2: false
            })
        }
    }

    processNega() {
        if (!this.state.o && !this.state.first) {
            var first = '-';
            this.setState({
                first: first,
                number: first
            })
        }
        if (this.state.o && !this.state.second) {
            var second = '-';
            this.setState({
                second: second,
                number: second
            })
        }
    }

    change(v) {
        if (v.type === 4) {
            this.processNumber(v.name)
        }
        else if (v.type === 2) {
            this.processO(v)
        }
        else if (v.type === 3) {
            this.processEqual()
        }
        else if (v.type === 5) {
            this.processDelect()
        }
        else if (v.type === 1) {
            this.processClear()
        }
        else if (v.type === 6) {
            this.processNega()
        }
        else if (v.type === 7) {
            this.processLink()
        }
    }

    render() {
        return (
            <div className="root">
                <Screen num={this.state.number}/>
                <Operator data={buttons} fn={this.change}/>
            </div>
        )
    }
}
var buttons = [
    {name: 'AC', type: 1},
    {name: '%', type: 2},
    {name: '+/-', type: 6},
    {name: 'DEL', type: 5},
    {name: '7', type: 4},
    {name: '8', type: 4},
    {name: '9', type: 4},
    {name: '+', type: 2},
    {name: '4', type: 4},
    {name: '5', type: 4},
    {name: '6', type: 4},
    {name: '-', type: 2},
    {name: '1', type: 4},
    {name: '2', type: 4},
    {name: '3', type: 4},
    {name: '*', type: 2},
    {name: '0', type: 4},
    {name: '.', type: 7},
    {name: '/', type: 2},
    {name: '=', type: 3}
];
ReactDOM.render(<Cal/>, root);