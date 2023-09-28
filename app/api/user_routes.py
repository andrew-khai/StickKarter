from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Project, db, Backing

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/projects')
@login_required
def user_projects():
    """
    Query for user projects
    """
    projects = Project.query.filter(current_user.id == Project.creator_id).all()
    # logging.info("!!!!!!!", projects)
    # logging.info("!!!!!!", {entry["id"]: entry for entry in projects})
    return {"projects": {entry.id: entry.to_dict_user() for entry in projects}}


@user_routes.route("/backings")
@login_required
def get_backings():
    """
    Query to get backings of user
    """
    backings = Backing.query.filter(current_user.id == Backing.user_id).all()
    return {"backings": {entry.id: entry.to_dict() for entry in backings}}

# @user_routes.route('/<int:id>/projects/<int:projectId>')
# @login_required
# def delete_project(id, projectId):
#     project = Project.query.get(projectId)
#     if not project:
#         return {"errors": ["Project is not found"]}, 404
#     if current_user.id != project.creator_id:
#         return {"errors": ["You are not authroized to delete this project"]}, 403
#     db.session.delete(project)
#     db.session.commit()
#     return {"message": "project deleted"}



@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that users details in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_summary()

@user_routes.route("/<int:id>/likes/<int:projectId>", methods=["POST"])
@login_required
def add_save(id, projectId):
    """
    Adds a project to a user's saved projects
    """
    user = User.query.get(id)
    project = Project.query.get(projectId)
    project.saves.append(user)
    db.session.commit()
    return user.to_dict_summary()

@user_routes.route("/<int:id>/likes/<int:projectId>", methods=["DELETE"])
@login_required
def remove_save(id, projectId):
    """
    Removes a project to a user's saved projects
    """
    user = User.query.get(id)
    project = Project.query.get(projectId)
    project.saves.remove(user)
    db.session.commit()
    return user.to_dict_summary()
