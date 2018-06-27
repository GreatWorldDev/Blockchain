import React, { Component } from 'react';
import Card from './components/card/Card';
import Header from './components/header/Header';
import './components/card/Card.scss';
import './components/styles/text.scss';
import './App.scss';
import Footer from './components/footer/Footer';
import TradingContainer from './components/trade/tradingContainer';
import MyCardsContainer from './components/mycards/MyCardsContainer';





class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: {},
    };
}

updateParentComponent() {
  this.setState({data: cardInfo});
}
  render() {
    //let cards = this.state.cards;
    return (
      <div>
        <div>
        <Header/>
          <div className = "square-container">
            <div className="other-players-cards">
              <TradingContainer/>
            </div>
            <div className="column-container">
              <div className="ether">
              <h1 className="amount-of-ether"> 100</h1>
              <h2 className="text-style"> Ether </h2>
              </div>
              <div className="my-cards">
                <h2 className="my-cards-title header-text"> My Cards </h2>
                <div className="my-cards-container">
                  <MyCardsContainer data={this.state.data}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer updateParent={this.updateParentComponent.bind(this)}/>

      </div>
    );
  }
}

export default App;
