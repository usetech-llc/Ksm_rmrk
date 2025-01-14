"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const Remark_js_1 = require("./Remark.js");
const Asset_js_1 = require("../Asset.js");
class Interaction extends Remark_js_1.Remark {
    constructor(rmrk, interaction, chain, version, transaction) {
        super(version, rmrk, chain, transaction);
        this.toJsonSerialize = () => ({
            version: this.version,
            rmrk: this.rmrk,
            // @ts-ignore
            chain: this.chain.toJson(),
            interaction: this.interaction
        });
        this.interaction = interaction;
    }
    rmrkToArray() {
        return this.rmrk.split('::');
    }
    nftFromComputedId(computed, meta) {
        let nftDatas = this.checkDatasLength(computed.split('-'));
        const sn = computed.split('-')[4];
        const assetId = computed.replace('-' + sn, '');
        return new Asset_js_1.Asset(this.rmrk, this.chain, this.version, this.transaction, nftDatas, assetId, meta);
    }
    static getComputedId(asset) {
        const blockId = asset.transaction.blockId;
        const collectionId = asset.token.contractId;
        const instance = asset.instance;
        const sn = asset.token.sn;
        return blockId + '-' + collectionId + '-' + instance + '-' + sn;
    }
    checkDatasLength(data) {
        const obj = Remark_js_1.Remark.entityObj;
        if (this.version === "1.0.0" || this.version === "RMRK1.0.0") {
            // Normalization
            if (data.length === 4) {
                obj.collection = data[1] + '-' + data[2];
                obj.name = data[2];
                obj.sn = data[3].match(/^[0-9]{16}/) ? data[3] : '';
            }
            else if (data.length > 4) {
                obj.collection = data[1] + '-' + data[2];
                obj.name = data[3];
                // obj.sn = data[data.length - 1];
                obj.sn = data[data.length - 1].match(/^[0-9]{16}/) ? data[data.length - 1] : '';
            }
        }
        return obj;
    }
}
exports.Interaction = Interaction;
//# sourceMappingURL=Interaction.js.map