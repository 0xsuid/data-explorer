
export type ChemicalData = {
    id: number;
    internalUuid: string;
    flowName: string;
    cas: string;
    declaredUnit: string;
    processName: string;
    type: string;
    country: string;
    isoCountryCode: string;
    processDescription: string;
    bioCarbonContent: number;
    carbonContent: number;
    allocationType: string;
    referencePeriod: string;
    techRep: number;
    timeRep: number;
    geoRep: number;
    completeness: number;
    reliability: number;
    methodConsistency: number;
    overallQuality: number;
    techRepTfs: number;
    timeRepTfs: number;
    geoRepTfs: number;
    completenessTfs: number;
    overallQualityTfs: number;
    reliabilityTfs: number;
    dqrShortTfs: number;
    pdsTfs: string;
    gwpClimateChange: number;
    gwpBiogenicEmissions: number;
    gwpBiogenicRemoval: number;
    gwpFossil: number;
    gwpLandUse: number;
};

export type GraphQLResponse = {
    data: {
        allChemicalData: ChemicalData[];
    };
}

export type GraphQLResponseByUuid = {
    data: {
        chemicalDataByUuid: ChemicalData;
    };
}