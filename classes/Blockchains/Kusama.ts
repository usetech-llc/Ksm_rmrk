import {SubstrateChain} from "./SubstrateChain.js";
import {KusamaAddress} from "../Addresses/KusamaAddress.js";
import {KusamaContract} from "../Contract/KusamaContract.js";


export class Kusama extends SubstrateChain
{
    static contractClass = new KusamaContract();
    constructor(){
        super("Kusama", "KSM", "", true, 'wss://kusama-rpc.polkadot.io/');
    }
    public getAddressClass(){
        return new KusamaAddress();
    }
    public toJson(needSubstrate : boolean = true){
        const json = this.toJsonSerialize();
        if(this.isSubstrate && needSubstrate){
            // @ts-ignore
            json['substrateOf'] = this.substrateOf
        }
        return json;
    }
}
