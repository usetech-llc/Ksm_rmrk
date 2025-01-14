import {Blockchain} from "../Blockchains/Blockchain.js";
import {Transaction} from "../Transaction.js";
import {EntityInterface} from "../Interfaces.js";


export abstract class Remark
{
    public static defaultVersion = '1.0.0';

    public transaction: Transaction;

    public static entityObj: EntityInterface = {
        version: "",
        name: "",
        max: 0,
        symbol: "",
        id: "",
        metadata: "",
        transferable: null,
        sn: "",
        collection: "",
        instance: ""
    };

    version: string;
    rmrk: string;
    chain: Blockchain;

    protected constructor(version: string|null, rmrk: string, chain: Blockchain, transaction: Transaction){

        this.rmrk = rmrk;
        this.chain = chain;

        if(version === null){
            version = Remark.defaultVersion;
        }

        this.transaction = transaction;

        this.version = version;
    }


}