from flask import Blueprint, jsonify
from app.models import Company
from flask_login import login_required, current_user

company_routes = Blueprint("companies", __name__)


@company_routes.route("/<int:company_id>")
@login_required
def current_company(company_id):
    """Gathers all info for the Current User's portfolio"""

    company = Company.query.get(company_id)

    if not company:
        return jsonify({"error": "Company not found"}), 404

    return jsonify(company.to_dict())

@company_routes.route('/all')
@login_required
def get_companies():
    companies = Company.query.all()
    print(companies, 'companies---------------')
    return jsonify([company.to_dict() for company in companies])
