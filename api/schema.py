from typing import List, Optional

import strawberry
from strawberry.extensions import Extension

from api.models import get_all_chemical_data, get_chemical_data, get_total_chemical_data_count, get_unique_countries
from api.database import SessionLocal

from .definitions.chemicalData import ChemicalData


class SQLAlchemySession(Extension):
    def on_request_start(self):
        self.execution_context.context["db"] = SessionLocal()

    def on_request_end(self):
        self.execution_context.context["db"].close()

@strawberry.type
class ChemicalDataConnection:
    items: List[ChemicalData]
    total_count: int

@strawberry.type
class Query:
    @strawberry.field(description="Retrieve a paginated list of chemical data based on the provided filters.")
    def all_chemical_data(
        self, 
        info, 
        page: int = 0, 
        page_size: int = 10,
        processName: Optional[str] = None,
        flowName: Optional[str] = None,
        type: Optional[str] = None,
        unit: Optional[str] = None,
        country: Optional[str] = None,
    ) -> ChemicalDataConnection:
        """
        Retrieve a paginated list of chemical data based on the provided filters.

        :param info: The GraphQL Info object containing context and other metadata.
        :param page: Page number (0-indexed).
        :param page_size: Number of items per page.
        :param processName: Filter by process name.
        :param flowName: Filter by flow name.
        :param type: Filter by chemical type.
        :param unit: Filter by measurement unit.
        :param country: Filter by country of origin.
        :return: A ChemicalDataConnection containing the paginated list of chemical data and total count.
        """
        db = info.context["db"]
        
         # Ensure page and page_size are valid (page starts at 1, and page_size must be positive)
        page = max(page, 0)
        page_size = max(page_size, 1)
        
        # Calculate offset for the query
        offset = page * page_size
        # Fetch the total count and paginated data from the database
        total_count = get_total_chemical_data_count(db, processName, flowName,type, unit, country)
        chemical_datas = get_all_chemical_data(db, processName, flowName,type, unit, country, limit=page_size, offset=offset)
        
        return ChemicalDataConnection(
            items=[ChemicalData.from_instance(chemical_data) for chemical_data in chemical_datas],
            total_count=total_count
        )
    
    @strawberry.field(description="Retrieve a specific chemical data entry by its UUID")
    def chemical_data_by_uuid(self, info, internal_uuid: str) -> Optional[ChemicalData]:
        db = info.context["db"]
        chemical_data = get_chemical_data(db, internal_uuid)
        if chemical_data:
            return ChemicalData.from_instance(chemical_data)
        return None

    @strawberry.field(description="Retrieve a list of unique countries")
    def unique_countries(self, info) -> List[str]:
        db = info.context["db"]
        countries = get_unique_countries(db)
        return [country[0] for country in countries]

schema = strawberry.Schema(Query, extensions=[SQLAlchemySession])
schema.config.docstring_descriptions = True