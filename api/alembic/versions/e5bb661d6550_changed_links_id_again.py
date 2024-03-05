"""changed links_id..again.

Revision ID: e5bb661d6550
Revises: 249890415bd1
Create Date: 2024-03-05 11:41:48.248361

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e5bb661d6550'
down_revision: Union[str, None] = '249890415bd1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
   pass


def downgrade() -> None:
   pass
