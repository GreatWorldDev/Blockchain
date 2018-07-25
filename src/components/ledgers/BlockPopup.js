import React, { Component } from 'react';
import './BlockPopup.scss';
import CancelBtn from './../buttons/CancelBtn';

const TRANSFER = "Transfer";
const ISSUE = "IssueKard";

class BlockPopup extends Component {
    
    blockText() {
        let block = this.props.blockInfo;
        let addresses = this.props.addresses;
        return block.map((item) => {
            console.log(item);
            let blockHash = item.blockHash;
            let eventValues = item.returnValues;
            let eventType = "Type: " + item.event;
            let kardId = "Kard ID: " + eventValues.kardId;
            let txHash = "Transaction Hash: " + item.transactionHash;
            let eventInfo;

            if (item.event === TRANSFER) {
                let from = "From: " + addresses[eventValues.from];
                let to = "To: " + addresses[eventValues.to];

                eventInfo = <div><p>{txHash}</p><p>{eventType}</p><p>{kardId}</p><p>{from}</p><p>{to}</p></div>
            } else if (item.event === ISSUE) {
                let owner = "Issued To: " + addresses[eventValues.owner]; //TODO: swap with name

                eventInfo = <div><p>{txHash}</p><p>{eventType}</p><p>{kardId}</p><p>{owner}</p></div>
            } else {
                console.log(eventType);
            }

            return (
                <div className="event-info">
                    {eventInfo}
                </div>
            )
        });
    }
    render() {
        let blockNumber = this.props.blockInfo[0].blockNumber;
        let headerText = "Block #" + blockNumber;
        let kaleidoInfo = this.props.kaleidoInfo;
        let explorerLink = ".kaleido.io/block/" + blockNumber + "?consortia=" + kaleidoInfo.consortia + "&environment=" + kaleidoInfo.environment;
        let prefix = "https://explorer" + (kaleidoInfo.locale ? "-" + kaleidoInfo.locale : "");
        explorerLink = prefix + explorerLink;
        console.log(explorerLink);
        if(this.props.visible) {
        return(
            <div className="overlay">
                <div className="block-popup-container">
                  <CancelBtn onClick={this.props.cancel}/>
                <div className="block-info-text">
                    <h2>{headerText}</h2>
                    <a target="_blank" href={explorerLink}>View in Kaleido Explorer</a>
                    {this.blockText()}
                </div>

                </div>
            </div>
        );
    }
    return null;
    }
}

export default BlockPopup;