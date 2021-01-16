"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainAddress = void 0;
const Entity_js_1 = require("../Entity.js");
const BlockchainAddressFactory_js_1 = require("./BlockchainAddressFactory.js");
const Reference_js_1 = require("../Reference.js");
class BlockchainAddress extends Entity_js_1.Entity {
    constructor(factory, address, sandraManager) {
        if (factory == null)
            factory = new BlockchainAddressFactory_js_1.BlockchainAddressFactory(sandraManager);
        super(factory);
        this.addReference(new Reference_js_1.Reference(sandraManager.get('address'), address));
    }
}
exports.BlockchainAddress = BlockchainAddress;
//# sourceMappingURL=BlockchainAddress.js.map