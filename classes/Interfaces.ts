
import {Blockchain} from "./Blockchains/Blockchain.js";


export interface BlockchainInterface
{
    name: string;
    symbol: string;
    prefix: string;
    isSubstrate: boolean;
}


export interface PublicInteraction
{
    version: string;
    rmrk: string;
    chain: Blockchain;
    interaction: string;
}

export interface PublicEntity
{
    version: string;
    rmrk: string;
    chain: Blockchain;
    standard: string
}

export interface EntityInterface
{
    version: string,
    name: string,
    max: number,
    symbol: string,
    id: string,
    metadata: string,
    transferable: boolean|null,
    sn: string,
    collection: string,
    instance: string
}

export interface MetaDataInputs
{
    external_url: string;
    image: string;
    description: string;
    name: string;
    attributes: Array<Object>;
    background_color: string;
    animation_url: string;
}

