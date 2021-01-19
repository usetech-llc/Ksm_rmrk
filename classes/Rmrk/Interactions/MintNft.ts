import {Interaction} from "../Interaction.js";
import {Blockchain} from "../../Blockchains/Blockchain.js";
import {Asset} from "../../Asset.js";
import {Transaction} from "../../Transaction.js";

export class MintNft extends Interaction
{
    myNft: Asset;

    constructor(rmrk: string, chain: Blockchain, transaction: Transaction){
        super(rmrk, MintNft.name, chain, null, transaction);
        // @ts-ignore
        const myNft = new Asset(this.rmrk, this.chain, null, this.signer.address);
        this.myNft = myNft.createNftFromInteraction();
    }

    // public createMintNft(){
    //
    //     // @ts-ignore
    //     const myNft = new Asset(this.rmrk, this.chain, null, this.signer.address);
    //     this.myNft = myNft.createNftFromInteraction();
    //
    //     return this;
    // }

    public toJson(){
        const json = this.myNft.toJson(false, true);
        // @ts-ignore
        json['interaction'] = this.interaction;
        return JSON.stringify(json);
    }
}