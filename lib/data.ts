import { GraphQLResponseByUuid } from "./definitions"

interface Pagination {
  pageIndex: number
  pageSize: number
}

export async function fetchDataset(pagination: Pagination, processName: string, country: string) {
  const { pageIndex, pageSize } = pagination

  const query = `query MyQuery( $pageIndex: Int!, $pageSize: Int!, $processName: String, $country: String  ) {
    allChemicalData (page: $pageIndex, pageSize: $pageSize, processName: $processName, country: $country ) {
      items{
          id
          internalUuid
          cas
          country
          declaredUnit
          type
          processName
          flowName
      }
      totalCount
    }
  }`
  const variables = {
    pageIndex,
    pageSize,
    processName,
    country
  }
  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query,
        variables
      })
    };
    
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, options)
  const jsonData = await response.json()

  return {
    rows: jsonData.data.allChemicalData.items,
    rowCount: jsonData.data.allChemicalData.totalCount, // Total number of rows (for pagination)
  };
}

export async function fetchChemicalData(internalUuid: string) {
  const query = `
    query MyQuery( $internalUuid: String!) {
      chemicalDataByUuid(internalUuid: $internalUuid) {
        id
        internalUuid
        flowName
        type
        cas
        processName
        country
        isoCountryCode
        processDescription
        bioCarbonContent
        carbonContent
        allocationType
        declaredUnit
        referencePeriod
        techRep
        timeRep
        geoRep
        completeness
        reliability
        methodConsistency
        overallQuality
        techRepTfs
        timeRepTfs
        geoRepTfs
        completenessTfs
        overallQualityTfs
        reliabilityTfs
        dqrShortTfs
        pdsTfs
        gwpClimateChange
        gwpBiogenicEmissions
        gwpBiogenicRemoval
        gwpFossil
        gwpLandUse
      }
    }
  `;
  const variables = {
    internalUuid
  };

  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query,
        variables
      })
    };
    
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, options)
  const jsonData : GraphQLResponseByUuid = await response.json()

  return jsonData.data.chemicalDataByUuid;
}

export async function fetchCountries() {

  const query = `
  query MyQuery {
    uniqueCountries
  }
  `

  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query
      })
    };
    
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, options)
  const jsonData = await response.json()

  return jsonData.data.uniqueCountries.map((country: string) => ({ value: country }));
}