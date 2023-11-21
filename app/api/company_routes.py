from flask import Blueprint, jsonify
from app.models import Company
from flask_login import login_required, current_user

company_routes = Blueprint("companies", __name__)


@company_routes.route("/<int:company_id>")
@login_required
def current_user_portfolio(company_id):
    """Gathers all info for the Current User's portfolio"""

    company = Company.query.get(company_id)

    if not company:
        return jsonify({"error": "Company not found"}), 404

    return company.to_dict()