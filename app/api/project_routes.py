from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Project, Reward

project_routes = Blueprint('projects', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@project_routes.route("")
def projects():
  """
  Query for all projects and return them in a list of project dictionaries
  """
  projects = Project.query.all()
  return {'projects': [project.to_dict_summary() for project in projects]}

@project_routes.route("/<int:id>")
def project(id):
    """
    Query for details of a single project
    """
    project = Project.query.get(id)
    return project.to_dict_summary()

# @project_routes.route("/test")
# def test():
#     rewards = Reward.query.all()
#     return {'rewards': [reward.to_dict() for reward in rewards]}
