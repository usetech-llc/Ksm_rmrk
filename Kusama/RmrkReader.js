"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmrkReader = void 0;
const Entity_js_1 = require("../classes/Rmrk/Entity.js");
const Nft_js_1 = require("../classes/Nft.js");
const Collection_js_1 = require("../classes/Collection.js");
const Mint_js_1 = require("../classes/Rmrk/Interactions/Mint.js");
const ChangeIssuer_js_1 = require("../classes/Rmrk/Interactions/ChangeIssuer.js");
const MintNft_js_1 = require("../classes/Rmrk/Interactions/MintNft.js");
const Send_js_1 = require("../classes/Rmrk/Interactions/Send.js");
const List_js_1 = require("../classes/Rmrk/Interactions/List.js");
const Buy_js_1 = require("../classes/Rmrk/Interactions/Buy.js");
const Consume_js_1 = require("../classes/Rmrk/Interactions/Consume.js");
class RmrkReader {
    constructor(chain, signer) {
        this.entityObj = {
            version: null,
            name: null,
            max: null,
            symbol: null,
            id: null,
            metadata: null,
            issuer: null,
            transferable: null,
            sn: null,
            collection: null
        };
        this.chain = chain;
        this.signer = signer;
    }
    readRmrk(rmrk) {
        const isInteraction = rmrk.includes('::');
        if (isInteraction) {
            return this.readInteraction(rmrk);
        }
        else {
            return this.readEntity(rmrk);
        }
    }
    readEntity(rmrk) {
        const splitted = rmrk.split(',');
        Entity_js_1.Entity.dataTreatment(splitted, this.entityObj);
        const myClass = (this.entityObj.id === null) ?
            new Nft_js_1.Nft(rmrk, this.chain, this.entityObj.version, this.signer) :
            new Collection_js_1.Collection(rmrk, this.chain, this.entityObj.version, this.signer);
        return myClass.rmrkToObject(this.entityObj);
    }
    readInteraction(rmrk) {
        const splitted = rmrk.split('::');
        let interaction = splitted[1];
        interaction = interaction.toLowerCase();
        let interactObj;
        switch (interaction) {
            case 'mint':
                interactObj = new Mint_js_1.Mint(rmrk, this.chain, this.signer);
                break;
            case 'changeissuer':
                interactObj = new ChangeIssuer_js_1.ChangeIssuer(rmrk, this.chain, this.signer);
                break;
            case 'mintnft':
                interactObj = new MintNft_js_1.MintNft(rmrk, this.chain, this.signer);
                break;
            case 'send':
                interactObj = new Send_js_1.Send(rmrk, this.chain, this.signer);
                break;
            case 'list':
                interactObj = new List_js_1.List(rmrk, this.chain, this.signer);
                break;
            case 'buy':
                interactObj = new Buy_js_1.Buy(rmrk, this.chain, this.signer);
                break;
            case 'consume':
            default:
                interactObj = new Consume_js_1.Consume(rmrk, this.chain, this.signer);
                break;
        }
        return interactObj;
    }
}
exports.RmrkReader = RmrkReader;
//# sourceMappingURL=RmrkReader.js.map