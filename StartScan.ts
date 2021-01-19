import {Option} from "commander";
import {Polkadot} from "./classes/Blockchains/Polkadot.js";
import {Unique} from "./classes/Blockchains/Unique.js";
import {Kusama} from "./classes/Blockchains/Kusama.js";
import {RmrkJetski} from "./Kusama/RmrkJetski.js";
import {Send} from "./classes/Rmrk/Interactions/Send.js";
import {Mint} from "./classes/Rmrk/Interactions/Mint.js";
import {SandraManager} from "./sandra/src/SandraManager.js";
import {KusamaBlockchain} from "./sandra/src/CSCannon/Substrate/Kusama/KusamaBlockchain.js";
import {BlockchainAddress} from "./sandra/src/CSCannon/BlockchainAddress.js";
import {BlockchainContract} from "./sandra/src/CSCannon/BlockchainContract.js";
import {BlockchainEvent} from "./sandra/src/CSCannon/BlockchainEvent.js";
import {Gossiper} from "./sandra/src/Gossiper.js";
import {RmrkContractStandard} from "./sandra/src/CSCannon/Interfaces/RmrkContractStandard.js";

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


export const testScan = async (opts: Option) => {

    let blockchain;

    // @ts-ignore
    switch (opts.chain.toLowerCase()){

        case "polkadot":
            blockchain = new Polkadot();
            break;

        case "unique":
            // TODO remake Unique Blockchain
            //@ts-ignore
            blockchain = new Unique();
            break;

        case "kusama":
        default:
            blockchain = new Kusama();
            break;
    }


    const scan = new RmrkJetski(blockchain);

    // @ts-ignore
    scan.getRmrks(opts.block).then(
        result => {

            result.forEach(value => {


                let recipient;
                let collName;

                if(value instanceof Send){

                    recipient = value.transaction.destination.address;
                    // @ts-ignore
                    collName = value.nftId.token.contractId;

                }else if(value instanceof Mint){

                    recipient = value.transaction.source.address;
                    collName = value.myCollection.name;
                }


                let sandra = new SandraManager();
                let blockchain = new KusamaBlockchain(sandra);

                // TODO change it when Mint is needed
                // Add signer '0x0' by default in Mint
                // @ts-ignore
                const signer = value.signer;
                let address = new BlockchainAddress(blockchain.addressFactory, signer, sandra);

                let receiver;
                if (recipient !== "undefined"){
                    //@ts-ignore
                    receiver = new BlockchainAddress(blockchain.addressFactory, recipient, sandra);
                }

                let contract;
                if(collName !== "undefined"){
                    //@ts-ignore
                    contract = new BlockchainContract(blockchain.contractFactory, collName, sandra,new RmrkContractStandard(sandra));
                }

                const txId = value.transaction.txHash;
                const timestamp = value.transaction.timestamp;
                const blockId = value.transaction.blockId;
                //@ts-ignore
                const contractStandard = new RmrkContractStandard(sandra, value.nftId.token.sn);

                //@ts-ignore
                let event = new BlockchainEvent(blockchain.eventFactory, address, receiver, contract, txId, timestamp, '1', blockchain, blockId, contractStandard, sandra);

                let gossiper = new Gossiper(blockchain.eventFactory, sandra.get(KusamaBlockchain.TXID_CONCEPT_NAME));
                const json = JSON.stringify(gossiper.exposeGossip());

                // console.log(json);

                // const xmlhttp = new XMLHttpRequest();
                // xmlhttp.open("POST", "http://arkam.everdreamsoft.com/alex/gossipTest");
                // xmlhttp.setRequestHeader("Content-Type", "application/json");
                // xmlhttp.send(json);
                // xmlhttp.addEventListener("load", ()=>{
                //     console.log("complete");
                // });

            })
        }
    );
}