/*var React = require('react');
var ReactDOM = require('react-dom');*/

var queue = [
    { food:"Pork", timer:1, temp:65 },
    { food:"Beef", timer:3, temp:60 },
    { food:"Fish", timer:0.5, temp:50 },
    { food:"Carrots", timer:0.2, temp:95 },
];

var QueueTableRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><div>{this.props.food}</div></td>
                <td><div>{this.props.timer}</div></td>
                <td><div>{this.props.temp}</div></td>
            </tr>
        );
    }
});

var QueueTable = React.createClass({
    getInitialState: function() {
        return {items: [
            { food:"Pork", timer:1, temp:65 },
            { food:"Beef", timer:3, temp:60 },
            { food:"Fish", timer:0.5, temp:50 },
            { food:"Carrots", timer:0.2, temp:95 },
        ]};
    },
    loadItems: function() {
        $.ajax({
          url: "192.168.0.17:8182/cycle/queue",
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({items: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error("Pi: ", status, err.toString());
          }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadItems();
        setInterval(this.loadItems, 5000);
    },
    render: function() {
        var rows = this.state.items.map( function(item) {
            return (
                <QueueTableRow food={item.food} timer={item.timer} temp={item.temp} />
            );
        });
        return (
            <table>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var TestDiv = React.createClass({
    render: function() {
        return (
            <div>
                <div>{this.props.text}</div>
                <div>{this.props.timer}</div>
                <div>{this.props.temp}</div>
            </div>

        );
    }
});

var TestDivFooter = React.createClass({
    render: function() {
        return (
            <div>I go at the bottom after the TestDivs</div>
        );
    }
});

var TestDivBlock = React.createClass({
    render: function() {
        var testDivRows = this.props.data.map(function(item) {
            return (
                <TestDiv text={item.name} timer={item.timer} temp={item.temp}/>
            );
        })
        return (
            <div>
                {testDivRows}
                <TestDivFooter/>
            </div>
        );
    }
});

ReactDOM.render(<QueueTable items={queue}/>, document.getElementById('maindiv'));
//ReactDOM.render(<TestDivBlock data={queue}/>, document.getElementById('maindiv'));
