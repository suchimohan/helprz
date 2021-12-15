"""adding tasks table

Revision ID: 19c9ff5310cc
Revises: 81525775b42e
Create Date: 2021-12-15 08:34:34.450638

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19c9ff5310cc'
down_revision = '81525775b42e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('requestUserId', sa.Integer(), nullable=False),
    sa.Column('taskerId', sa.Integer(), nullable=False),
    sa.Column('citiesId', sa.Integer(), nullable=False),
    sa.Column('taskTypesId', sa.Integer(), nullable=False),
    sa.Column('dateTime', sa.DateTime(), nullable=False),
    sa.Column('taskDescription', sa.Text(), nullable=False),
    sa.Column('duration', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['citiesId'], ['cities.id'], ),
    sa.ForeignKeyConstraint(['requestUserId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['taskTypesId'], ['taskTypes.id'], ),
    sa.ForeignKeyConstraint(['taskerId'], ['taskers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    # ### end Alembic commands ###
