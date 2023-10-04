from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app import db
from app.models import Project, Reward, Backing, User
from app.forms import ProjectForm, RewardForm, BackingForm
from .aws_helper import ALLOWED_EXTENSIONS, upload_file_to_s3, get_unique_filename, remove_file_from_s3
from datetime import datetime

project_routes = Blueprint('projects', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@project_routes.route("")
def projects():
  """
  Query for all projects and return them in a list of project dictionaries
  """
  search_query = request.args.get('search')
  projects = Project.query
  if search_query:
      projects = projects.filter((Project.title.ilike(f"%{search_query}%")))

  projects = projects.all()
  return {'projects': [project.to_dict_summary() for project in projects]}

@project_routes.route("/new", methods=["POST"])
@login_required
def create_project():
    """
    Create a new project
    """
    form = ProjectForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["project_image"]
        # print('image---', image)
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print('upload---', upload)

        if "url" not in upload:
            return {"errors": [upload["errors"]]}, 400

        project = Project(
           creator_id = form.data["creator_id"],
           category_id = form.data["category_id"],
           title = form.data["title"],
           description = form.data["description"],
           story = form.data["story"],
           faq = form.data["faq"],
           project_image = upload["url"],
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

@project_routes.route("/<int:id>/backings", methods=["POST"])
@login_required
def create_backing(id):
    """
    Create a new backing for a project
    """
    project = Project.query.get(id)

    form = BackingForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        backing = Backing(
            user_id = form.data["user_id"],
            project_id = id,
            reward_id = form.data["reward_id"],
            amount_pledged = form.data["amount_pledged"]
        )
        db.session.add(backing)
        db.session.commit()
        return {'project': project.to_dict_summary()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@project_routes.route("/<int:id>/rewards", methods=["POST"])
@login_required
def create_reward(id):
    """
    Create a project reward
    """
    project = Project.query.get(id)

    form = RewardForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if not project:
        return {"errors": ["Project is not found"]}, 404

    if current_user.id != project.creator_id:
        return {"errors": ["You are not authorized to edit this project"]}, 403

    if form.validate_on_submit():
        reward = Reward(
            project_id = id,
            title = form.data["title"],
            description = form.data["description"],
            price = form.data["price"]
        )
        db.session.add(reward)
        db.session.commit()
        return {
            "project": project.to_dict_rewards()
        }
    else:
        return {
            "errors": validation_errors_to_error_messages(form.errors)
        }

@project_routes.route("/<int:id>/rewards")
@login_required
def get_rewards(id):
    """
    Query for project rewards
    """
    project = Project.query.get(id)

    if not project:
        return {"errors": ["Project is not found"]}, 404

    if current_user.id != project.creator_id:
        return {"errors": ["You are not authorized to edit rewards for this project"]}, 403

    rewards = Reward.query.filter(project.id == Reward.project_id).all()
    return {"rewards": {entry.id: entry.to_dict() for entry in rewards}}



@project_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_project(id):
    print('I am in the put route')
    project = Project.query.get(id)
    print(project.project_image)

    form = ProjectForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if not project:
        return {"errors": ["Project is not found"]}, 404

    if current_user.id != project.creator_id:
        return {"errors": ["You are not authorized to edit this project"]}, 403

    if form.validate_on_submit():
        image = form.data["project_image"]
        # print(f"image here {image}")
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print('upload---', upload)
            if upload:
                if "url" not in upload:
                    return {"errors": [upload["errors"]]}, 400
                else:
                    project.project_image = upload["url"]
            else:
                project.project_image = project.project_image


        project.category_id = form.data["category_id"]
        project.title = form.data["title"]
        project.description = form.data["description"]
        project.story = form.data["story"]
        project.faq = form.data["faq"]
        # project.project_image = upload["url"]
        project.start_date = form.data["start_date"]
        project.end_date = form.data["end_date"]
        project.funding_goal = form.data["funding_goal"]
        project.location = form.data["location"]
        db.session.commit()
        return {'project': project.to_dict_summary()}
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@project_routes.route("/<int:id>")
def project(id):
    """
    Query for details of a single project
    """
    project = Project.query.get(id)
    if not project:
        return {"errors": ["Project is not found"]}, 404
    return project.to_dict_summary()



@project_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_project(id):
    project = Project.query.get(id)

    if not project:
        return {"errors": ["Project is not found"]}, 404
    if current_user.id != project.creator_id:
        return {"errors": ["You are not authroized to delete this project"]}, 403

    file_deleted = remove_file_from_s3(project.project_image)

    if file_deleted is True:
        db.session.delete(project)
        db.session.commit()
        return {"message": "project deleted"}
    else:
        return{"errors": ["File Delete Error!"]}, 403
