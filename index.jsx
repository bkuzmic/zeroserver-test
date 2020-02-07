import React from 'react'
export default class extends React.Component {
    static async getInitialProps() {        
        var json = await fetch("/db").then((resp) => resp.json())        
        return {langs: json.langs}
    }
    render() {
        const langs = this.props.langs.map((item, index) =>
            <li key={index}>{item.name}</li>
        );
        return (
            <p>All the languages in database: 
                <ul>{langs}</ul>
            </p>
        )
    }
}