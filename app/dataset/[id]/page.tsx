import { fetchChemicalData } from "@/lib/data";
import { ChemicalData } from "@/lib/definitions";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";
import DetailsView from "@/components/dashboard/dataset-details-view";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const chemicalData: ChemicalData = await fetchChemicalData(id);

  if (!chemicalData) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4 xl:px-6 2xl:px-4 max-w-[1536px]">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dataset">
                Explore Dataset
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <div className="my-8">
          <h1 className="text-4xl font-bold dark:text-white">
            {chemicalData.flowName}
          </h1>
        </div>
        <div className="space-y-4">
          <DetailsView
            title="Process Name"
            description={chemicalData.processName}
          />
          <DetailsView
            title="Process Description"
            description={chemicalData.processDescription}
          />
          <DetailsView title="Type" description={chemicalData.type} />
          <DetailsView title="CAS" description={chemicalData.cas} />
          <DetailsView title="Country" description={chemicalData.country} />
          <DetailsView
            title="Bio Carbon Content"
            description={chemicalData.bioCarbonContent}
          />
          <DetailsView
            title="Carbon Content"
            description={chemicalData.carbonContent}
          />
          <DetailsView
            title="Allocation Type"
            description={chemicalData.allocationType}
          />
          <DetailsView title="Unit" description={chemicalData.declaredUnit} />
          <DetailsView
            title="Reference Period"
            description={chemicalData.referencePeriod}
          />
          <DetailsView
            title="Tech Rep"
            description={
              chemicalData.techRep +
              " - The main product under study is modeled using an industrially relevant production technology that is not necessarily the market's dominant technology. Raw materials are partly based on consumption mixes, the market's dominant production technology, or an industrially relevant production technology. The production of crude oil, naphtha, and natural gas is represented by data for production and consumption mixes from ecoinvent (e.g., a specific European country or European average)."
            }
          />
          <DetailsView
            title="Time Rep"
            description={
              chemicalData.timeRep +
              " - Time representativeness is reviewed annually. Updates will be made for any data points identified as non-representative based on the quality ratings established for this data set. Details on the quality ratings are provided in the cm.chemicals"
            }
          />
          <DetailsView
            title="Geo Rep"
            description={
              chemicalData.geoRep +
              " - The model of the process is based on a relevant production technology applied on a global scale. The term production technology refers to the production method in terms of reaction pathway, reactor technology, separation steps, etc. Each production"
            }
          />
          <DetailsView
            title="Completeness"
            description={
              chemicalData.completeness +
              " - All technical flows and major elementary flows have been determined based on simplified process modeling. The main product is represented by only an industrially relevant production technology and no trade data has been included for the main product"
            }
          />
          <DetailsView
            title="Reliability"
            description={
              chemicalData.reliability +
              " - Chemical process data has been obtained from simplified process simulations. Data gaps have been closed based on additional modeling. All process data has been verified through mass and atom balances and - whenever possible - cross-checked with"
            }
          />
          <DetailsView
            title="Method Consistency"
            description={
              chemicalData.methodConsistency +
              " - All datasets are based on the methodology specified in the cm.chemicals methodology document. The application of the methodology leads to high levels of consistency."
            }
          />
          <DetailsView
            title="Overall Quality"
            description={chemicalData.overallQuality}
          />
          <DetailsView
            title="TechRep TfS"
            description={chemicalData.techRepTfs}
          />
          <DetailsView
            title="TimeRep TfS"
            description={chemicalData.timeRepTfs}
          />
          <DetailsView
            title="GeoRep TfS"
            description={chemicalData.geoRepTfs}
          />
          <DetailsView
            title="Completeness TfS"
            description={chemicalData.completenessTfs}
          />
          <DetailsView
            title="Reliability TfS"
            description={chemicalData.reliabilityTfs}
          />
          <DetailsView
            title="OverallQuality TfS"
            description={chemicalData.overallQualityTfs}
          />
          <DetailsView
            title="DQRShort TfS"
            description={chemicalData.dqrShortTfs}
          />
          <DetailsView title="PDS TfS" description={chemicalData.pdsTfs} />
          <DetailsView
            title="Carbon Minds ISO 14067 (based on IPCC 2021) - climate change - global warming potential (GWP100) [kg CO2-Eq]"
            description={chemicalData.gwpClimateChange}
          />
          <DetailsView
            title="Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: biogenic emissions - global warming potential (GWP100) [kg CO2-Eq]"
            description={chemicalData.gwpBiogenicEmissions}
          />
          <DetailsView
            title="Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: biogenic removal - global warming potential (GWP100) [kg CO2-Eq]"
            description={chemicalData.gwpBiogenicRemoval}
          />
          <DetailsView
            title="Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: fossil - global warming potential (GWP100) [kg CO2-Eq]"
            description={chemicalData.gwpFossil}
          />
          <DetailsView
            title="Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: land use - global warming potential (GWP100) [kg CO2-Eq]"
            description={chemicalData.gwpLandUse}
          />
        </div>
      </div>
    </div>
  );
}
