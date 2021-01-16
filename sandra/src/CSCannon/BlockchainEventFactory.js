"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainEventFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
class BlockchainEventFactory extends EntityFactory_js_1.EntityFactory {
    constructor(blockchain, sandra) {
        super('blockchainEvent', 'blockchainEventFile', sandra);
        this.updateOnExistingRef = sandra.get('txId');
        // this.joinFactory(blockchain.addressFactory,BlockchainEvent.EVENT_SOURCE_ADDRESS);
        // this.joinFactory(blockchain.addressFactory,BlockchainEvent.EVENT_DESTINATION_VERB);
        // this.joinFactory(blockchain.contractFactory,BlockchainEvent.EVENT_SOURCE_CONTRACT);
        // this.joinFactory(blockchain.blockFactory,BlockchainEvent.EVENT_BLOCK);
    }
}
exports.BlockchainEventFactory = BlockchainEventFactory;
//# sourceMappingURL=BlockchainEventFactory.js.map