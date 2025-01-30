from typing import Optional
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Session

from .database import Base

class ChemicalData(Base):
    __tablename__ = 'chemical_data'

    id = Column(Integer, primary_key=True, autoincrement=True)
    internal_uuid = Column(String, unique=True, nullable=False)  
    flow_name = Column(String, nullable=False)  
    type = Column(String, nullable=False)  
    cas = Column(String, nullable=False)  
    process_name = Column(String, nullable=False)  
    country = Column(String, nullable=False)  
    iso_country_code = Column(String, nullable=False)  
    process_description = Column(String, nullable=True)  
    bio_carbon_content = Column(Float, nullable=False)  
    carbon_content = Column(Float, nullable=False)  
    allocation_type = Column(String, nullable=False)  
    declared_unit = Column(String, nullable=False)  
    reference_period = Column(String, nullable=False)  
    tech_rep = Column(Integer, nullable=True)  
    time_rep = Column(Integer, nullable=True)  
    geo_rep = Column(Integer, nullable=True)  
    completeness = Column(Integer, nullable=True)  
    reliability = Column(Integer, nullable=True)  
    method_consistency = Column(Integer, nullable=True)  
    overall_quality = Column(Integer, nullable=True)  
    tech_rep_tfs = Column(Integer, nullable=True)  
    time_rep_tfs = Column(Integer, nullable=True)  
    geo_rep_tfs = Column(Integer, nullable=True)  
    completeness_tfs = Column(Integer, nullable=True)
    reliability_tfs = Column(Integer, nullable=True)
    overall_quality_tfs = Column(Integer, nullable=True)
    dqr_short_tfs = Column(Integer, nullable=False)  
    pds_tfs = Column(String, nullable=True)  
    gwp_climate_change = Column(Float, nullable=False)  
    gwp_biogenic_emissions = Column(Float, nullable=False)  
    gwp_biogenic_removal = Column(Float, nullable=False)  
    gwp_fossil = Column(Float, nullable=False)  
    gwp_land_use = Column(Float, nullable=False)  

def get_all_chemical_data(db, processName: Optional[str] = None, flowName: Optional[str] = None, type: Optional[str] = None, unit: Optional[str] = None, country: Optional[str] = None, limit: int = 10, offset: int = 0):
    query = db.query(ChemicalData)
    
    if processName:
        query = query.filter(ChemicalData.process_name.ilike(f'%{processName}%'))
    if flowName:
        query = query.filter(ChemicalData.flow_name.ilike(f'%{flowName}%'))
    if type:
        query = query.filter(ChemicalData.type == type)
    if unit:
        query = query.filter(ChemicalData.declared_unit == unit)
    if country:
        query = query.filter(ChemicalData.country == country)
    
    return query.limit(limit).offset(offset).all()

def get_total_chemical_data_count(db, processName: Optional[str] = None, flowName: Optional[str] = None, type: Optional[str] = None, unit: Optional[str] = None, country: Optional[str] = None):
    query = db.query(ChemicalData)
    
    if processName:
        query = query.filter(ChemicalData.process_name.ilike(f'%{processName}%'))
    if flowName:
        query = query.filter(ChemicalData.flow_name.ilike(f'%{flowName}%'))
    if type:
        query = query.filter(ChemicalData.type == type)
    if unit:
        query = query.filter(ChemicalData.declared_unit == unit)
    if country:
        query = query.filter(ChemicalData.country == country)
    
    return query.count()

def get_chemical_data(db: Session, internal_uuid: str):
    checmicalData = db.query(ChemicalData).filter(ChemicalData.internal_uuid == internal_uuid).first()
    return checmicalData

def get_unique_countries(db: Session):
    return db.query(ChemicalData.country).distinct().order_by(ChemicalData.country.asc()).all()