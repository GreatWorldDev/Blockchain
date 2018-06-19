import React, { Component } from 'react';
import './Footer.scss';
import PurchaseBtn from './../buttons/PurchaseBtn';
import BasicPack from './../basicPack/BasicPack';
import PlatinumPack from './../platinumPack/PlatinumPack';

class Footer extends Component {
    render() {
        return( 
            <div className="footer">
            <h1 className="secondary-header"> Store</h1>
                <div className="footer-cards">
                    <BasicPack/>
                    <PlatinumPack/>
                </div>
                <div className="footer-buttons">
                    <PurchaseBtn/>
                </div>
            </div> 
        )
    }
}

export default Footer;