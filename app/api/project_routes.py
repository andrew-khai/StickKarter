from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app import db
from app.models import Project, Reward
from app.forms import ProjectForm
from datetime import datetime

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
    if not project:
        return {"errors": ["Project is not found"]}, 404
    return project.to_dict_summary()

@project_routes.route("/new", methods=["POST"])
@login_required
def create_project():
    """
    Create a new project
    """
    form = ProjectForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        project = Project(
           creator_id = form.data["creator_id"],
           category_id = form.data["category_id"],
           title = form.data["title"],
           description = form.data["description"],
           story = form.data["story"],
           faq = form.data["faq"],
           project_image = form.data["project_image"],
           start_date = form.data["start_date"],
           end_date = form.data["end_date"],
           funding_goal = form.data["funding_goal"],
           location = form.data["location"],
           created_at = datetime.today()
        )
        db.session.add(project)
        db.session.commit()
        return {'project': project.to_dict_summary()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# @project_routes.route("/test")
# def test():
#     rewards = Reward.query.all()
#     return {'rewards': [reward.to_dict() for reward in rewards]}
