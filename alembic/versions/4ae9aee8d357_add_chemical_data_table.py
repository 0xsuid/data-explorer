"""Add chemical data table

Revision ID: 4ae9aee8d357
Revises: 
Create Date: 2025-01-07 01:37:48.210505

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4ae9aee8d357'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chemical_data',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('internal_uuid', sa.String(), nullable=False),
    sa.Column('flow_name', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('cas', sa.String(), nullable=False),
    sa.Column('process_name', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('iso_country_code', sa.String(), nullable=False),
    sa.Column('process_description', sa.String(), nullable=True),
    sa.Column('bio_carbon_content', sa.Float(), nullable=False),
    sa.Column('carbon_content', sa.Float(), nullable=False),
    sa.Column('allocation_type', sa.String(), nullable=False),
    sa.Column('declared_unit', sa.String(), nullable=False),
    sa.Column('reference_period', sa.String(), nullable=False),
    sa.Column('tech_rep', sa.Integer(), nullable=True),
    sa.Column('time_rep', sa.Integer(), nullable=True),
    sa.Column('geo_rep', sa.Integer(), nullable=True),
    sa.Column('completeness', sa.Integer(), nullable=True),
    sa.Column('reliability', sa.Integer(), nullable=True),
    sa.Column('method_consistency', sa.Integer(), nullable=True),
    sa.Column('overall_quality', sa.Integer(), nullable=True),
    sa.Column('tech_rep_tfs', sa.Integer(), nullable=True),
    sa.Column('time_rep_tfs', sa.Integer(), nullable=True),
    sa.Column('geo_rep_tfs', sa.Integer(), nullable=True),
    sa.Column('completeness_tfs', sa.Integer(), nullable=True),
    sa.Column('reliability_tfs', sa.Integer(), nullable=True),
    sa.Column('overall_quality_tfs', sa.Integer(), nullable=True),
    sa.Column('dqr_short_tfs', sa.Integer(), nullable=False),
    sa.Column('pds_tfs', sa.String(), nullable=True),
    sa.Column('gwp_climate_change', sa.Float(), nullable=False),
    sa.Column('gwp_biogenic_emissions', sa.Float(), nullable=False),
    sa.Column('gwp_biogenic_removal', sa.Float(), nullable=False),
    sa.Column('gwp_fossil', sa.Float(), nullable=False),
    sa.Column('gwp_land_use', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('internal_uuid')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('chemical_data')
    # ### end Alembic commands ###
