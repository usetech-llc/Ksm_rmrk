"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Send = void 0;
const Interaction_js_1 = require("../Interaction.js");
class Send extends Interaction_js_1.Interaction {
    constructor(rmrk, chain, transaction, meta) {
        super(rmrk, Send.name, chain, null, transaction);
        const splitted = this.rmrkToArray();
        this.version = splitted[2];
        Send.computedId = splitted[3];
        this.nft = this.nftFromComputedId(splitted[3], meta);
        this.transaction.setDestination(this.chain.getAddressClass(splitted[4]));
    }
    toJson() {
        const json = this.toJsonSerialize();
        // @ts-ignore
        json['nftId'] = this.nftId.toJson(false, false);
        return JSON.stringify(json);
    }
}
exports.Send = Send;
Send.computedId = "";
//# sourceMappingURL=Send.js.map