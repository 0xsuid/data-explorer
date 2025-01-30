from typing import Optional
import strawberry
from api.models import ChemicalData as ChemicalDataModel

@strawberry.type
class ChemicalData:
    id: int
    internal_uuid: str
    flow_name: str
    cas: str
    process_name: str
    country: str
    iso_country_code: str
    type: str
    process_description: Optional[str]
    bio_carbon_content: float
    carbon_content: float
    allocation_type: str
    declared_unit: str
    reference_period: str
    tech_rep: Optional[int]
    time_rep: Optional[int]
    geo_rep: Optional[int]
    completeness: Optional[int]
    reliability: Optional[int]
    method_consistency: Optional[int]
    overall_quality: Optional[int]
    tech_rep_tfs: Optional[int]
    time_rep_tfs: Optional[int]
    geo_rep_tfs: Optional[int]
    completeness_tfs: Optional[int]
    reliability_tfs: Optional[int]
    overall_quality_tfs: Optional[int]
    dqr_short_tfs: int
    pds_tfs: Optional[str]
    gwp_climate_change: float
    gwp_biogenic_emissions: float
    gwp_biogenic_removal: float
    gwp_fossil: float
    gwp_land_use: float
    

    @classmethod
    def from_instance(cls, instance: ChemicalDataModel):
        """
        Create a ChemicalData instance from a dictionary.
        This is useful when reading data from a database or external source.
        """
        return cls(
            id=instance.id,
            internal_uuid=instance.internal_uuid,
            flow_name=instance.flow_name,
            cas=instance.cas,
            process_name=instance.process_name,
            country=instance.country,
            iso_country_code=instance.iso_country_code,
            type=instance.type,
            process_description=instance.process_description,
            bio_carbon_content=instance.bio_carbon_content,
            carbon_content=instance.carbon_content,
            allocation_type=instance.allocation_type,
            declared_unit=instance.declared_unit,
            reference_period=instance.reference_period,
            tech_rep=instance.tech_rep,
            time_rep=instance.time_rep,
            geo_rep=instance.geo_rep,
            completeness=instance.completeness,
            reliability=instance.reliability,
            method_consistency=instance.method_consistency,
            overall_quality=instance.overall_quality,
            tech_rep_tfs=instance.tech_rep_tfs,
            time_rep_tfs=instance.time_rep_tfs,
            geo_rep_tfs=instance.geo_rep_tfs,
            completeness_tfs = instance.completeness_tfs,
            reliability_tfs = instance.reliability_tfs,
            overall_quality_tfs = instance.overall_quality_tfs,
            dqr_short_tfs=instance.dqr_short_tfs,
            pds_tfs=instance.pds_tfs,
            gwp_climate_change=instance.gwp_climate_change,
            gwp_biogenic_emissions=instance.gwp_biogenic_emissions,
            gwp_biogenic_removal=instance.gwp_biogenic_removal,
            gwp_fossil=instance.gwp_fossil,
            gwp_land_use=instance.gwp_land_use,
        )